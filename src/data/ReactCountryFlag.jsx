import * as React from 'react';

const OFFSET = 127397;

const languageToCountry = {
    'en': 'US',
    'it': 'IT',
    'fr': 'FR',
    'de': 'DE',
    'es': 'ES',
    'ja': 'JP',
    'ko': 'KR',
    'zh': 'CN',
    'pt': 'PT',
    'ru': 'RU',
    'ar': 'SA',
    'hi': 'IN',
    'nl': 'NL',
    'sv': 'SE',
    'da': 'DK',
    'no': 'NO',
    'fi': 'FI',
    'pl': 'PL',
    'tr': 'TR',
    'th': 'TH',
    'vi': 'VN'
};

export const ReactCountryFlag = ({ countryCode, style, ...props }) => {
    if (typeof countryCode !== 'string') {
        return null;
    }

    const actualCountryCode = languageToCountry[countryCode.toLowerCase()];

    const emoji = actualCountryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + OFFSET));

    return (
        <span
            role="img"
            aria-label={`Flag of ${actualCountryCode}`}
            {...props}
            style={{
                display: 'inline-block',
                fontSize: '1.2em',
                lineHeight: '1em',
                verticalAlign: 'middle',
                marginLeft: '5px',
                ...style,
            }}
        >
            {emoji}
        </span>
    );
};

export default ReactCountryFlag;
