import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const countryCodes = [
  { code: 'AF', label: 'Afghanistan', dial_code: '+93' },
  { code: 'AL', label: 'Albania', dial_code: '+355' },
  { code: 'DZ', label: 'Algeria', dial_code: '+213' },
  { code: 'AS', label: 'American Samoa', dial_code: '+1-684' },
  { code: 'AD', label: 'Andorra', dial_code: '+376' },
  { code: 'AO', label: 'Angola', dial_code: '+244' },
  { code: 'AI', label: 'Anguilla', dial_code: '+1-264' },
  { code: 'AQ', label: 'Antarctica', dial_code: '+672' },
  { code: 'AG', label: 'Antigua and Barbuda', dial_code: '+1-268' },
  { code: 'AR', label: 'Argentina', dial_code: '+54' },
  { code: 'AM', label: 'Armenia', dial_code: '+374' },
  { code: 'AW', label: 'Aruba', dial_code: '+297' },
  { code: 'AU', label: 'Australia', dial_code: '+61' },
  { code: 'AT', label: 'Austria', dial_code: '+43' },
  { code: 'AZ', label: 'Azerbaijan', dial_code: '+994' },
  { code: 'BS', label: 'Bahamas', dial_code: '+1-242' },
  { code: 'BH', label: 'Bahrain', dial_code: '+973' },
  { code: 'BD', label: 'Bangladesh', dial_code: '+880' },
  { code: 'BB', label: 'Barbados', dial_code: '+1-246' },
  { code: 'BY', label: 'Belarus', dial_code: '+375' },
  { code: 'BE', label: 'Belgium', dial_code: '+32' },
  { code: 'BZ', label: 'Belize', dial_code: '+501' },
  { code: 'BJ', label: 'Benin', dial_code: '+229' },
  { code: 'BM', label: 'Bermuda', dial_code: '+1-441' },
  { code: 'BT', label: 'Bhutan', dial_code: '+975' },
  { code: 'BO', label: 'Bolivia', dial_code: '+591' },
  { code: 'BA', label: 'Bosnia and Herzegovina', dial_code: '+387' },
  { code: 'BW', label: 'Botswana', dial_code: '+267' },
  { code: 'BR', label: 'Brazil', dial_code: '+55' },
  { code: 'IO', label: 'British Indian Ocean Territory', dial_code: '+246' },
  { code: 'VG', label: 'British Virgin Islands', dial_code: '+1-284' },
  { code: 'BN', label: 'Brunei', dial_code: '+673' },
  { code: 'BG', label: 'Bulgaria', dial_code: '+359' },
  { code: 'BF', label: 'Burkina Faso', dial_code: '+226' },
  { code: 'BI', label: 'Burundi', dial_code: '+257' },
  { code: 'KH', label: 'Cambodia', dial_code: '+855' },
  { code: 'CM', label: 'Cameroon', dial_code: '+237' },
  { code: 'CA', label: 'Canada', dial_code: '+1' },
  { code: 'CV', label: 'Cape Verde', dial_code: '+238' },
  { code: 'KY', label: 'Cayman Islands', dial_code: '+1-345' },
  { code: 'CF', label: 'Central African Republic', dial_code: '+236' },
  { code: 'TD', label: 'Chad', dial_code: '+235' },
  { code: 'CL', label: 'Chile', dial_code: '+56' },
  { code: 'CN', label: 'China', dial_code: '+86' },
  { code: 'CX', label: 'Christmas Island', dial_code: '+61' },
  { code: 'CC', label: 'Cocos (Keeling) Islands', dial_code: '+61' },
  { code: 'CO', label: 'Colombia', dial_code: '+57' },
  { code: 'KM', label: 'Comoros', dial_code: '+269' },
  { code: 'CG', label: 'Congo', dial_code: '+242' },
  { code: 'CK', label: 'Cook Islands', dial_code: '+682' },
  { code: 'CR', label: 'Costa Rica', dial_code: '+506' },
  { code: 'HR', label: 'Croatia', dial_code: '+385' },
  { code: 'CU', label: 'Cuba', dial_code: '+53' },
  { code: 'CW', label: 'Curaçao', dial_code: '+599' },
  { code: 'CY', label: 'Cyprus', dial_code: '+357' },
  { code: 'CZ', label: 'Czech Republic', dial_code: '+420' },
  { code: 'CD', label: 'Democratic Republic of the Congo', dial_code: '+243' },
  { code: 'DK', label: 'Denmark', dial_code: '+45' },
  { code: 'DJ', label: 'Djibouti', dial_code: '+253' },
  { code: 'DM', label: 'Dominica', dial_code: '+1-767' },
  { code: 'DO', label: 'Dominican Republic', dial_code: '+1-809' },
  { code: 'EC', label: 'Ecuador', dial_code: '+593' },
  { code: 'EG', label: 'Egypt', dial_code: '+20' },
  { code: 'SV', label: 'El Salvador', dial_code: '+503' },
  { code: 'GQ', label: 'Equatorial Guinea', dial_code: '+240' },
  { code: 'ER', label: 'Eritrea', dial_code: '+291' },
  { code: 'EE', label: 'Estonia', dial_code: '+372' },
  { code: 'SZ', label: 'Eswatini', dial_code: '+268' },
  { code: 'ET', label: 'Ethiopia', dial_code: '+251' },
  { code: 'FK', label: 'Falkland Islands', dial_code: '+500' },
  { code: 'FO', label: 'Faroe Islands', dial_code: '+298' },
  { code: 'FJ', label: 'Fiji', dial_code: '+679' },
  { code: 'FI', label: 'Finland', dial_code: '+358' },
  { code: 'FR', label: 'France', dial_code: '+33' },
  { code: 'PF', label: 'French Polynesia', dial_code: '+689' },
  { code: 'GA', label: 'Gabon', dial_code: '+241' },
  { code: 'GM', label: 'Gambia', dial_code: '+220' },
  { code: 'GE', label: 'Georgia', dial_code: '+995' },
  { code: 'DE', label: 'Germany', dial_code: '+49' },
  { code: 'GH', label: 'Ghana', dial_code: '+233' },
  { code: 'GI', label: 'Gibraltar', dial_code: '+350' },
  { code: 'GR', label: 'Greece', dial_code: '+30' },
  { code: 'GL', label: 'Greenland', dial_code: '+299' },
  { code: 'GD', label: 'Grenada', dial_code: '+1-473' },
  { code: 'GP', label: 'Guadeloupe', dial_code: '+590' },
  { code: 'GU', label: 'Guam', dial_code: '+1-671' },
  { code: 'GT', label: 'Guatemala', dial_code: '+502' },
  { code: 'GG', label: 'Guernsey', dial_code: '+44-1481' },
  { code: 'GN', label: 'Guinea', dial_code: '+224' },
  { code: 'GW', label: 'Guinea-Bissau', dial_code: '+245' },
  { code: 'GY', label: 'Guyana', dial_code: '+592' },
  { code: 'HT', label: 'Haiti', dial_code: '+509' },
  { code: 'HN', label: 'Honduras', dial_code: '+504' },
  { code: 'HK', label: 'Hong Kong', dial_code: '+852' },
  { code: 'HU', label: 'Hungary', dial_code: '+36' },
  { code: 'IS', label: 'Iceland', dial_code: '+354' },
  { code: 'IN', label: 'India', dial_code: '+91' },
  { code: 'ID', label: 'Indonesia', dial_code: '+62' },
  { code: 'IR', label: 'Iran', dial_code: '+98' },
  { code: 'IQ', label: 'Iraq', dial_code: '+964' },
  { code: 'IE', label: 'Ireland', dial_code: '+353' },
  { code: 'IM', label: 'Isle of Man', dial_code: '+44-1624' },
  { code: 'IL', label: 'Israel', dial_code: '+972' },
  { code: 'IT', label: 'Italy', dial_code: '+39' },
  { code: 'CI', label: 'Ivory Coast', dial_code: '+225' },
  { code: 'JM', label: 'Jamaica', dial_code: '+1-876' },
  { code: 'JP', label: 'Japan', dial_code: '+81' },
  { code: 'JE', label: 'Jersey', dial_code: '+44-1534' },
  { code: 'JO', label: 'Jordan', dial_code: '+962' },
  { code: 'KZ', label: 'Kazakhstan', dial_code: '+7' },
  { code: 'KE', label: 'Kenya', dial_code: '+254' },
  { code: 'KI', label: 'Kiribati', dial_code: '+686' },
  { code: 'XK', label: 'Kosovo', dial_code: '+383' },
  { code: 'KW', label: 'Kuwait', dial_code: '+965' },
  { code: 'KG', label: 'Kyrgyzstan', dial_code: '+996' },
  { code: 'LA', label: 'Laos', dial_code: '+856' },
  { code: 'LV', label: 'Latvia', dial_code: '+371' },
  { code: 'LB', label: 'Lebanon', dial_code: '+961' },
  { code: 'LS', label: 'Lesotho', dial_code: '+266' },
  { code: 'LR', label: 'Liberia', dial_code: '+231' },
  { code: 'LY', label: 'Libya', dial_code: '+218' },
  { code: 'LI', label: 'Liechtenstein', dial_code: '+423' },
  { code: 'LT', label: 'Lithuania', dial_code: '+370' },
  { code: 'LU', label: 'Luxembourg', dial_code: '+352' },
  { code: 'MO', label: 'Macao', dial_code: '+853' },
  { code: 'MG', label: 'Madagascar', dial_code: '+261' },
  { code: 'MW', label: 'Malawi', dial_code: '+265' },
  { code: 'MY', label: 'Malaysia', dial_code: '+60' },
  { code: 'MV', label: 'Maldives', dial_code: '+960' },
  { code: 'ML', label: 'Mali', dial_code: '+223' },
  { code: 'MT', label: 'Malta', dial_code: '+356' },
  { code: 'MH', label: 'Marshall Islands', dial_code: '+692' },
  { code: 'MQ', label: 'Martinique', dial_code: '+596' },
  { code: 'MR', label: 'Mauritania', dial_code: '+222' },
  { code: 'MU', label: 'Mauritius', dial_code: '+230' },
  { code: 'YT', label: 'Mayotte', dial_code: '+262' },
  { code: 'MX', label: 'Mexico', dial_code: '+52' },
  { code: 'FM', label: 'Micronesia', dial_code: '+691' },
  { code: 'MD', label: 'Moldova', dial_code: '+373' },
  { code: 'MC', label: 'Monaco', dial_code: '+377' },
  { code: 'MN', label: 'Mongolia', dial_code: '+976' },
  { code: 'ME', label: 'Montenegro', dial_code: '+382' },
  { code: 'MS', label: 'Montserrat', dial_code: '+1-664' },
  { code: 'MA', label: 'Morocco', dial_code: '+212' },
  { code: 'MZ', label: 'Mozambique', dial_code: '+258' },
  { code: 'MM', label: 'Myanmar', dial_code: '+95' },
  { code: 'NA', label: 'Namibia', dial_code: '+264' },
  { code: 'NR', label: 'Nauru', dial_code: '+674' },
  { code: 'NP', label: 'Nepal', dial_code: '+977' },
  { code: 'NL', label: 'Netherlands', dial_code: '+31' },
  { code: 'NC', label: 'New Caledonia', dial_code: '+687' },
  { code: 'NZ', label: 'New Zealand', dial_code: '+64' },
  { code: 'NI', label: 'Nicaragua', dial_code: '+505' },
  { code: 'NE', label: 'Niger', dial_code: '+227' },
  { code: 'NG', label: 'Nigeria', dial_code: '+234' },
  { code: 'NU', label: 'Niue', dial_code: '+683' },
  { code: 'NF', label: 'Norfolk Island', dial_code: '+672' },
  { code: 'KP', label: 'North Korea', dial_code: '+850' },
  { code: 'MK', label: 'North Macedonia', dial_code: '+389' },
  { code: 'MP', label: 'Northern Mariana Islands', dial_code: '+1-670' },
  { code: 'NO', label: 'Norway', dial_code: '+47' },
  { code: 'OM', label: 'Oman', dial_code: '+968' },
  { code: 'PK', label: 'Pakistan', dial_code: '+92' },
  { code: 'PW', label: 'Palau', dial_code: '+680' },
  { code: 'PS', label: 'Palestine', dial_code: '+970' },
  { code: 'PA', label: 'Panama', dial_code: '+507' },
  { code: 'PG', label: 'Papua New Guinea', dial_code: '+675' },
  { code: 'PY', label: 'Paraguay', dial_code: '+595' },
  { code: 'PE', label: 'Peru', dial_code: '+51' },
  { code: 'PH', label: 'Philippines', dial_code: '+63' },
  { code: 'PL', label: 'Poland', dial_code: '+48' },
  { code: 'PT', label: 'Portugal', dial_code: '+351' },
  { code: 'PR', label: 'Puerto Rico', dial_code: '+1-787' },
  { code: 'QA', label: 'Qatar', dial_code: '+974' },
  { code: 'RE', label: 'Réunion', dial_code: '+262' },
  { code: 'RO', label: 'Romania', dial_code: '+40' },
  { code: 'RU', label: 'Russia', dial_code: '+7' },
  { code: 'RW', label: 'Rwanda', dial_code: '+250' },
  { code: 'BL', label: 'Saint Barthélemy', dial_code: '+590' },
  { code: 'SH', label: 'Saint Helena', dial_code: '+290' },
  { code: 'KN', label: 'Saint Kitts and Nevis', dial_code: '+1-869' },
  { code: 'LC', label: 'Saint Lucia', dial_code: '+1-758' },
  { code: 'MF', label: 'Saint Martin (French part)', dial_code: '+590' },
  { code: 'PM', label: 'Saint Pierre and Miquelon', dial_code: '+508' },
  { code: 'VC', label: 'Saint Vincent and the Grenadines', dial_code: '+1-784' },
  { code: 'WS', label: 'Samoa', dial_code: '+685' },
  { code: 'SM', label: 'San Marino', dial_code: '+378' },
  { code: 'ST', label: 'Sao Tome and Principe', dial_code: '+239' },
  { code: 'SA', label: 'Saudi Arabia', dial_code: '+966' },
  { code: 'SN', label: 'Senegal', dial_code: '+221' },
  { code: 'RS', label: 'Serbia', dial_code: '+381' },
  { code: 'SC', label: 'Seychelles', dial_code: '+248' },
  { code: 'SL', label: 'Sierra Leone', dial_code: '+232' },
  { code: 'SG', label: 'Singapore', dial_code: '+65' },
  { code: 'SX', label: 'Sint Maarten', dial_code: '+1-721' },
  { code: 'SK', label: 'Slovakia', dial_code: '+421' },
  { code: 'SI', label: 'Slovenia', dial_code: '+386' },
  { code: 'SB', label: 'Solomon Islands', dial_code: '+677' },
  { code: 'SO', label: 'Somalia', dial_code: '+252' },
  { code: 'ZA', label: 'South Africa', dial_code: '+27' },
  { code: 'KR', label: 'South Korea', dial_code: '+82' },
  { code: 'SS', label: 'South Sudan', dial_code: '+211' },
  { code: 'ES', label: 'Spain', dial_code: '+34' },
  { code: 'LK', label: 'Sri Lanka', dial_code: '+94' },
  { code: 'SD', label: 'Sudan', dial_code: '+249' },
  { code: 'SR', label: 'Suriname', dial_code: '+597' },
  { code: 'SE', label: 'Sweden', dial_code: '+46' },
  { code: 'CH', label: 'Switzerland', dial_code: '+41' },
  { code: 'SY', label: 'Syria', dial_code: '+963' },
  { code: 'TW', label: 'Taiwan', dial_code: '+886' },
  { code: 'TJ', label: 'Tajikistan', dial_code: '+992' },
  { code: 'TZ', label: 'Tanzania', dial_code: '+255' },
  { code: 'TH', label: 'Thailand', dial_code: '+66' },
  { code: 'TL', label: 'Timor-Leste', dial_code: '+670' },
  { code: 'TG', label: 'Togo', dial_code: '+228' },
  { code: 'TK', label: 'Tokelau', dial_code: '+690' },
  { code: 'TO', label: 'Tonga', dial_code: '+676' },
  { code: 'TT', label: 'Trinidad and Tobago', dial_code: '+1-868' },
  { code: 'TN', label: 'Tunisia', dial_code: '+216' },
  { code: 'TR', label: 'Turkey', dial_code: '+90' },
  { code: 'TM', label: 'Turkmenistan', dial_code: '+993' },
  { code: 'TC', label: 'Turks and Caicos Islands', dial_code: '+1-649' },
  { code: 'TV', label: 'Tuvalu', dial_code: '+688' },
  { code: 'UG', label: 'Uganda', dial_code: '+256' },
  { code: 'UA', label: 'Ukraine', dial_code: '+380' },
  { code: 'AE', label: 'United Arab Emirates', dial_code: '+971' },
  { code: 'GB', label: 'United Kingdom', dial_code: '+44' },
  { code: 'US', label: 'United States', dial_code: '+1' },
  { code: 'UY', label: 'Uruguay', dial_code: '+598' },
  { code: 'UZ', label: 'Uzbekistan', dial_code: '+998' },
  { code: 'VU', label: 'Vanuatu', dial_code: '+678' },
  { code: 'VA', label: 'Vatican City', dial_code: '+379' },
  { code: 'VE', label: 'Venezuela', dial_code: '+58' },
  { code: 'VN', label: 'Vietnam', dial_code: '+84' },
  { code: 'WF', label: 'Wallis and Futuna', dial_code: '+681' },
  { code: 'EH', label: 'Western Sahara', dial_code: '+212' },
  { code: 'YE', label: 'Yemen', dial_code: '+967' },
  { code: 'ZM', label: 'Zambia', dial_code: '+260' },
  { code: 'ZW', label: 'Zimbabwe', dial_code: '+263' },
]

const AuthPage = ({ title, subtitle, fields, submitLabel, hintText, hintLink, onSubmit, extraContent, heroImage }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-card-decor decor-top" />
        <div className="auth-card-decor decor-bottom" />

        <div
          className="auth-hero"
          style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
        >
          <div className="auth-hero-overlay">
            <p className="auth-label">Food Delivery</p>
            <h1>{title}</h1>
            <p className="auth-subtitle">{subtitle}</p>
          </div>
        </div>

        <form className="auth-form" noValidate onSubmit={onSubmit}>
          {fields.map((field) => {
            if (field.type === 'file') {
              return (
                <div key={field.name} className="form-field">
                  <span>{field.label}</span>
                  <label className="file-input-label auth-file-input">
                    <span>{field.fileName || field.placeholder || 'Upload a file'}</span>
                    <input
                      type="file"
                      accept={field.accept}
                      onChange={field.onChange}
                    />
                  </label>
                </div>
              )
            }

            return (
              <label key={field.name} className="form-field">
                <span>{field.label}</span>
                {field.type === 'phone' ? (
                  <div className="phone-group">
                    <div className="country-field">
                      <input
                        type="text"
                        list="countryCodes"
                        name={`${field.name}Country`}
                        className="country-input"
                        placeholder="Select or type country"
                        value={field.countryValue}
                        onChange={field.onCountryChange}
                      />
                      <datalist id="countryCodes">
                        {countryCodes.map((country) => (
                          <option
                            key={country.code}
                            value={`${country.label} (${country.dial_code})`}
                          />
                        ))}
                      </datalist>
                    </div>
                    <input
                      type="tel"
                      name={field.name}
                      placeholder={field.placeholder}
                      className="input phone-input"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                ) : field.type === 'password' ? (
                  <div className="password-field">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="input"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.95 10.95 0 0 1 12 20c-3.7 0-7-1.63-9.14-4.26" />
                          <path d="M1 1l22 22" />
                          <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" />
                          <path d="M8.53 3.15a11.36 11.36 0 0 1 6.95 2.08" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                ) : field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    className="input textarea"
                    value={field.value}
                    onChange={field.onChange}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="input"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              </label>
            )
          })}

          {extraContent}

          <button type="submit" className="submit-button">
            {submitLabel}
          </button>
        </form>

        <p className="auth-footer">
          {hintText}{' '}
          <Link to={hintLink.to}>{hintLink.label}</Link>
        </p>
      </section>
    </main>
  )
}

export default AuthPage
