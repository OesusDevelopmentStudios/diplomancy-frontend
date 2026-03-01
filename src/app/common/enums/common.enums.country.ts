import { TranslateService } from '@ngx-translate/core';

enum Country
{
    NOR = 0,
    SWE,
    RUS,
    GER,
    FRA,
    SPA,
    ITA,
    GBR,
    AUT_HUN,
    OTT_EMP
}

export function countryAsText(value: Country, translate: TranslateService): string
{
    switch (value)
    {
        case Country.NOR: return translate.instant('common.country.nor');
        case Country.SWE: return translate.instant('common.country.swe');
        case Country.RUS: return translate.instant('common.country.rus');
        case Country.GER: return translate.instant('common.country.ger');
        case Country.FRA: return translate.instant('common.country.fra');
        case Country.SPA: return translate.instant('common.country.spa');
        case Country.ITA: return translate.instant('common.country.ita');
        case Country.GBR: return translate.instant('common.country.gbr');
        case Country.AUT_HUN: return translate.instant('common.country.aut_hun');
        case Country.OTT_EMP: return translate.instant('common.country.ott_emp');
        default: return translate.instant('common.unknown');
    }
}

export function toFileName(value: Country): string
{
    switch (value)
    {
        case Country.NOR: return 'nor.png';
        case Country.SWE: return 'swe.png';
        case Country.RUS: return 'rus.png';
        case Country.GER: return 'ger.png';
        case Country.FRA: return 'fra.png';
        case Country.SPA: return 'spa.png';
        case Country.ITA: return 'ita.png';
        case Country.GBR: return 'gbr.png';
        case Country.AUT_HUN: return 'aut_hun.png';
        case Country.OTT_EMP: return 'ott_emp.png';
        default: return 'unknown';
    }
}

export { Country }
