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

/**
 * 페이지 이름 보여주기
 * 페이지 설명 보여주기
 *
 * 페이지 삭제, 이름 변경
 *
 * variables 보여주기, 설명이랑 같이
 * functions 보여주기, 설명이랑 같이
 *
 * variable 추가 삭제 이름, 설명 변경
 * function 추가 삭제 이름, 설명 변경
 */
