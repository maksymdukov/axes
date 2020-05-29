import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { default as NextLink } from 'next-translate/Link';
import MuiLink from '@material-ui/core/Link';
import { usePurePathname } from '~/hooks/url';
import { DisableLinkContext } from '~/context/404-page/disable-link-context';

const NextComposed = React.forwardRef(function NextComposed(props, ref) {
  const { as, href, lang, ...other } = props;

  return (
    <NextLink href={href} as={as} lang={lang}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

NextComposed.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  prefetch: PropTypes.bool
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function LinkComponent(props) {
  const {
    href,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;

  // fix for 404 page
  const { disableActiveLinks } = useContext(DisableLinkContext);

  const purePathname = usePurePathname();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]:
      purePathname === pathname && !disableActiveLinks && activeClassName
  });

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        href={href}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href}
      {...other}
    />
  );
}

LinkComponent.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool
};
const Link = React.forwardRef((props, ref) => (
  <LinkComponent {...props} innerRef={ref} />
));

export default Link;
