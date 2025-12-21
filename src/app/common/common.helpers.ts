import { TranslateService } from '@ngx-translate/core';

import { supportedLanguages, defaultLanguage } from '../common/common.data';

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
