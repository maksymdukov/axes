import AxesPage, { fetchAxes } from "./[page]";

export async function getStaticProps({ params }) {
  const data = await fetchAxes(1);
  return {
    props: { axes: data, page: 1, pageCount: 2 }
  };
}

export default AxesPage;
