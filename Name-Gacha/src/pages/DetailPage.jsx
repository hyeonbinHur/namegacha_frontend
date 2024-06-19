import { useParams } from 'react-router-dom';
export default function DetailPage() {
    const params = useParams();
    return <div>{params.pageId}</div>;
}

/** 페이지 정보를 받아서,
 * 페이지에대한 정보 가져오기를 로드하고,
 * 페이지이름,
 *  설명,
 * variables,
 * function 설명포함해서 보여주기 */
