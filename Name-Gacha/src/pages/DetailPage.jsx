import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as pageAPI from '../utils/api/aws/pageRoutes';

export default function DetailPage() {
    const params = useParams();
    const { data } = useQuery(
        'getPageInfo',
        () => pageAPI.getPage(params.pageId),
        { enabled: !!params.pageId }
    );

    return (
        <div>
            {params.pageId}
            <button onClick={() => console.log(data)}>show page info</button>
        </div>
    );
}

/** 페이지 정보를 받아서,
 * 페이지에대한 정보 가져오기를 로드하고,
 * 페이지이름,
 *  설명,
 * variables,
 * function 설명포함해서 보여주기 */
