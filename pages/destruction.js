import { Layout } from '../containers/layout';
import { Listeroid } from '../containers/listeroid';

function Destruction() {
  let destructionList = null;

  // Использую localStorage, что ломает всю систему ssr
  // Но для тестового задания это пойдет)
  if (typeof window !== 'undefined') {
    destructionList = JSON.parse(localStorage.getItem('destructionList'));
  }

  return (
    <Layout title="Distruction">
      {destructionList ? (
        <Listeroid data={destructionList} isDistruction />
      ) : (
        'loader'
      )}
    </Layout>
  );
}

export default Destruction;
