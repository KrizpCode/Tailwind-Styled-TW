import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { BudgetsProvider } from '../contexts/BudgetContext';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<BudgetsProvider>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				<Component {...pageProps} />
			</BudgetsProvider>
		</>
	);
}
export default MyApp;
