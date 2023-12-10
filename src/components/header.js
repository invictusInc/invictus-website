import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Menu, X } from "react-feather"
import {
  Container,
  Flex,
  FlexList,
  Space,
  NavLink,
  Button,
  InteractiveIcon,
  Nudge,
  VisuallyHidden,
} from "./ui"
import {
  mobileNavOverlay,
  mobileNavLink,
  desktopHeaderNavWrapper,
  mobileHeaderNavWrapper,
  mobileNavSVGColorWrapper,
} from "./header.css"
import NavItemGroup from "./nav-item-group"
import BrandLogo from "./brand-logo"

export default function Header() {
  const data = useStaticQuery(graphql`
    query {
      layout {
        header {
          id
          navItems {
            id
            navItemType
            ... on NavItem {
              href
              text
            }
            ... on NavItemGroup {
              name
              navItems {
                id
                href
                text
                description
                icon {
                  alt
                  gatsbyImageData
                }
              }
            }
          }
          cta {
            id
            href
            text
          }
        }
      }
    }
  `)

  const { navItems, cta } = data.layout.header
  const [isOpen, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "visible"
    }
  }, [isOpen])

  return (
    <header>
      <Container className={desktopHeaderNavWrapper}>
        <Space size={2} />
        <Flex variant="spaceBetween">
          <NavLink to="/">
            <VisuallyHidden>Home</VisuallyHidden>
            <img width="140px" src="data:image/png;base64,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"/>
          </NavLink>
          <nav>
            <FlexList gap={4}>
              {navItems &&
                navItems.map((navItem) => (
                  <li key={navItem.id}>
                    {navItem.navItemType === "Group" ? (
                      <NavItemGroup
                        name={navItem.name}
                        navItems={navItem.navItems}
                      />
                    ) : (
                      <NavLink to={navItem.href}>{navItem.text}</NavLink>
                    )}
                  </li>
                ))}
            </FlexList>
          </nav>
          <div>{cta && <Button to={cta.href}>{cta.text}</Button>}</div>
        </Flex>
      </Container>
      <Container className={mobileHeaderNavWrapper[isOpen ? "open" : "closed"]}>
        <Space size={2} />
        <Flex variant="spaceBetween">
          <span
            className={
              mobileNavSVGColorWrapper[isOpen ? "reversed" : "primary"]
            }
          >
            <NavLink to="/">
              <VisuallyHidden>Home</VisuallyHidden>
              <BrandLogo />
            </NavLink>
          </span>
          <Flex>
            <Space />
            <div>
              {cta && (
                <Button to={cta.href} variant={isOpen ? "reversed" : "primary"}>
                  {cta.text}
                </Button>
              )}
            </div>
            <Nudge right={3}>
              <InteractiveIcon
                title="Toggle menu"
                onClick={() => setOpen(!isOpen)}
                className={
                  mobileNavSVGColorWrapper[isOpen ? "reversed" : "primary"]
                }
              >
                {isOpen ? <X /> : <Menu />}
              </InteractiveIcon>
            </Nudge>
          </Flex>
        </Flex>
      </Container>

      {isOpen && (
        <div className={mobileNavOverlay}>
          <nav>
            <FlexList responsive variant="stretch">
              {navItems?.map((navItem) => (
                <li key={navItem.id}>
                  {navItem.navItemType === "Group" ? (
                    <NavItemGroup
                      name={navItem.name}
                      navItems={navItem.navItems}
                    />
                  ) : (
                    <NavLink to={navItem.href} className={mobileNavLink}>
                      {navItem.text}
                    </NavLink>
                  )}
                </li>
              ))}
            </FlexList>
          </nav>
        </div>
      )}
    </header>
  )
}
