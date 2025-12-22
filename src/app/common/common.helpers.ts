import { TranslateService } from '@ngx-translate/core';

import { supportedLanguages, defaultLanguage } from '../common/common.data';
import { environment } from '../../environments/environment';

async function getKey(): Promise<CryptoKey>
{
    const rawKey = new TextEncoder().encode(environment.key);
    const key = await window.crypto.subtle.digest('SHA-256', rawKey);
    return window.crypto.subtle.importKey('raw', key, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

export function loadLanguage(translate: TranslateService): void
{
    const lang = localStorage.getItem('language');
    if (!lang)
    {
        const browserLang: string | undefined = translate.getBrowserLang();
        translate.use(
        browserLang && supportedLanguages.includes(browserLang)
            ? browserLang
            : defaultLanguage
        );

        localStorage.setItem('language', browserLang ? browserLang : defaultLanguage);
        return;
    }

    if (supportedLanguages.includes(lang))
    {
        translate.use(lang);
    }
}

export function changeLanguage(translate: TranslateService, lang: string): void
{
    if (supportedLanguages.includes(lang))
    {
        translate.use(lang);
        localStorage.setItem('language', lang);
    }
}

export async function encrypt(text : string): Promise<string>
{
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const data = new TextEncoder().encode(text);
    const key = await getKey();
    const buffer = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, data);
    const ivBuffer = new Uint8Array(iv.byteLength + buffer.byteLength);
    ivBuffer.set(iv, 0);
    ivBuffer.set(new Uint8Array(buffer), iv.byteLength);
    return btoa(String.fromCharCode(...ivBuffer));
}

export async function decrypt(secret : string): Promise<string>
{
    try
    {
        const ivBuffer = Uint8Array.from(atob(secret), c => c.charCodeAt(0)).buffer;
        const iv = ivBuffer.slice(0, 12);
        const buffer = ivBuffer.slice(12);
        const key = await getKey();
        const decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, buffer);
        return new TextDecoder().decode(decrypted);
    }
    catch (error)
    {
        console.error('Decryption error:', error);
        return '';
    }
}
