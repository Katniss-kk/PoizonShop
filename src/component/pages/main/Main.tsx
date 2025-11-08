import { useData } from '../../hooks/dataProvider';

export default function Main() {
  const { page } = useData();

  return <main>{page}</main>;
}
