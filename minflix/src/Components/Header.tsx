import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px 60px;
  font-size: 14px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};

  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  color: white;

  svg {
    height: 25px;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: ${(props) => props.theme.red};
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const Input = styled(motion.input)`
  z-index: -1;
  transform-origin: right center;
  position: absolute;
  right: 0;
  padding: 5px 10px 5px 40px;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();

  const toggleSearch = () => {
    if (searchOpen) {
      // trigger ther close animation
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      // trigger ther open animation
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY]);

  return (
    <Nav variants={navVariants} animate={navAnimation} initial="top">
      <Col>
        <Logo
          variants={logoVariants}
          whileHover="active"
          animate="normal"
          width="1224"
          height="347"
          viewBox="0 0 1224 347"
          xmlns="http://www.w3.org/2000/svg">
          <motion.path
            xmlns="http://www.w3.org/2000/svg"
            d="M102.284 208.37L69.0629 0H0.64679V347L52.5 339.5L43.5745 101.621L80.242 336.5L132.747 330L152.732 98.1515L160.732 325.5L207.237 321L196.237 0H114.821L102.284 208.37ZM249.61 0V317L311.798 312V0H249.61ZM412.18 125.673L489.441 303.5L543.971 301V0H480.149L483.149 135.704L429.619 0H357.911V307L412.18 305.5V125.673ZM641.971 123.167V54.5715H724.907V0H582.783V300H641.971V176.739H702.468V123.167H641.971ZM759.089 0V304.176L897 311.5V257.5L810.277 252V0H759.089ZM936.213 0V315L995.401 320.5V0H936.213ZM1221.07 0H1155.46L1124.45 85.8943L1100.34 0H1031.36L1091.84 162L1025.5 323L1082.5 331L1122 245L1153 341L1223 347L1155.46 162L1221.07 0Z"
          />
        </Logo>
        <Items>
          <Item>
            <Link to="/">
              Home
              {homeMatch?.pathname === "/" && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              Tv Shows
              {tvMatch?.pathname === "/tv" && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -185 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"></path>
          </motion.svg>
          <Input
            // {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for movie or tv show..."
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
