// common
import React,{ useEffect, useRef } from 'react'

// theme
import { AiFillHome } from 'react-icons/ai'
import { useTheme } from '@nextui-org/react'

// UI
import {
  Grid,
  Card,
  Button,
} from '@nextui-org/react'

// router
import { useRouter } from 'next/router'

// redux
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import { switchToHome } from '../../../shared/store/features/section/actions'

// component
import Menu from './menu'
import DropdownComponent from './dropdown'

interface INavItemPropType {
  children: React.ReactNode
}
export const NavItem: React.FC<INavItemPropType>  = ({ children }: INavItemPropType) => {
  return (
    <Card
      id="NavCard"
      css={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: '0.1',
        color: '$layer1',
      }}
    >
      {children}
    </Card>
  )
}

const NavBar = () => {
  const { isDark, type } = useTheme()
  const dispatch = useAppDispatch();
  const { state, isLoggedIn, pending } = useAppSelector((state) => state.web3User);
  const { currentSection, isChanging, error } = useAppSelector((state) => state.section);
  // const { provider, web3Provider, address, network } = state
  const homeBtn = useRef(null);
  const whaleBtn = useRef(null);
  const traceBtn = useRef(null);
  const walletBtn = useRef(null);
  const router = useRouter()

  useEffect(() => {
    switch (currentSection.name) {
      case "HOME":
          homeBtn?.current?.active;
      case "WHALE":
        break;
      case "TRACE":
        break;
      case "WALLET":
        break;
      default:
        homeBtn?.current?.active;
    }
  
    return () => {
    }
  }, [currentSection])
  
  return (
    <nav
      style={{
        // overflow: 'hidden',
        position: 'fixed',
        top: '0px',
        zIndex: '9999',
      }}
    >
      <Grid.Container
        gap={0.5}
        justify="space-evenly"
        css={{
          py: '0',
          my: '0',
          // mt: '$2',
          // h:'$space$1',
          color: '$layer9',
          // bc: '$layer0',
          bc: '$layer0',
          p: 'fixed',
          overflow: 'hidden',
          position: 'fixed' /* Set the navbar to fixed position */,
          t: 0 /* Position the navbar at the top of the page */,
          zIndex: '9999',
          // display:'block'
        }}
      >
        <Grid xs={0} md={0}>
          <NavItem>
            <Button
              as="div"
              auto
              color="gradient"
              ghost
              css={{ 
                flexGrow: '2',
              }}
            >
              <AiFillHome />
            </Button>
          </NavItem>
        </Grid>
        <Grid xs={2} sm={2} md={1}>
          <NavItem>
            <Button
              as="div"
              auto
              color="gradient"
              ghost
              css={{ flexGrow: '2' }}
              ref={homeBtn}
              onClick={(e) => {
                e.preventDefault()
                dispatch(switchToHome())
                // router.push('/')
              }}
            >
              <AiFillHome size="1.8rem" />
            </Button>
          </NavItem>
        </Grid>
        <Grid xs={10} sm={8} md={9}>
          <Menu />
        </Grid>
        <Grid xs={12} sm={2}>
          <NavItem>
            <DropdownComponent />
          </NavItem>
        </Grid>
      </Grid.Container>
    </nav>
  )
}

export default NavBar
