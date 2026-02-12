import Script from 'next/script'

export default function Head() {
	return (
		<head>
			<link rel='manifest' href='/manifest.json' />
			<link rel='icon' href='/favicon.png' />

			<link rel='preconnect' href='https://fonts.googleapis.com' />
			<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />

			<link href='https://fonts.googleapis.com/css2?family=Averia+Gruesa+Libre&display=swap' rel='stylesheet' />

			<Script src='https://www.googletagmanager.com/gtag/js?id=G-ZNSFR7C9PM' />
			<Script id='google-analytics'>
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZNSFR7C9PM');
        `}
			</Script>
		</head>
	)
}
