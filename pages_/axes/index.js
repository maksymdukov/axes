import AxesPage from './[page]';
import { getAxes } from '../../api/server/axe';

export async function getStaticProps({ lang }) {
  const { items, page, total, size } = await getAxes({ lang });
  return {
    props: { items, page, total, size }
  };
}

export default AxesPage;
