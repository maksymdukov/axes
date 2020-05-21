import AxesPage from './[page]';
import { getAxes } from '../../actions/axe';

export async function getStaticProps({ lang }) {
  const { data, pageCount } = await getAxes(lang, 1);
  return {
    props: { axes: data, page: 1, pageCount }
  };
}

export default AxesPage;
