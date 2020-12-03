import AxesPage from './[page]';
import { getAxes } from '../../apis/server/axe';

export async function getStaticProps({ locale }) {
  const { items, page, total, size } = await getAxes({ lang: locale });
  return {
    props: { items, page, total, size }
  };
}

export default AxesPage;
