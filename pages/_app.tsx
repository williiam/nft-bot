import '../styles/globals.css'
import React, { FC } from 'react'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

// component
import NavBar from '../components/main/Navbar'

// redux
import { wrapper } from '../shared/store/store'
import { Provider as ReduxProvider } from 'react-redux'

// nextUI
import { NextUIProvider } from '@nextui-org/react'

// nextUI theme
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from 'next-themes'
import { getTheme } from '../shared/common/theme'
import { lightTheme, darkTheme } from '../shared/theme'

import 'react-toastify/dist/ReactToastify.css'

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const { theme } = useNextTheme()
  const themeSetting = getTheme(theme)
  return (
    // <ReduxProvider store={store}>
        <NextThemesProvider
          defaultTheme="dark"
          attribute="class"
          enableColorScheme={true}
          value={{
            light: lightTheme.className,
            dark: darkTheme.className,
          }}
        >
          <NextUIProvider disableBaseline={true}>
            <Component {...pageProps} />
            <ToastContainer
              hideProgressBar
              position="bottom-right"
              autoClose={2000}
            />
          </NextUIProvider>
        </NextThemesProvider>
    // </ReduxProvider>
  )
}

export default wrapper.withRedux(MyApp)
