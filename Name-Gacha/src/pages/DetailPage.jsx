import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as pageAPI from '../utils/api/aws/pageRoutes';
import DetailHeader from '../components/Details/Header/DetailHeader';
import VariableContainer from '../components/Details/Variables/VariableContainer';
import FunctionContainer from '../components/Details/Functions/FunctionContainer';
import { useEffect, useState } from 'react';

export default function DetailPage() {
    const params = useParams();
    const [pageId, setPageId] = useState(null);

    useEffect(() => {
        if (params.pageId) {
            setPageId(params.pageId);
        }
    }, [params]);

    const {
        data: page,
        error,
        isLoading,
    } = useQuery(
        ['getPageInfo', pageId], // 쿼리 키에 pageId를 포함시켜 각 pageId에 대해 별도의 캐시를 관리
        () => pageAPI.getPage(pageId),
        {
            enabled: !!pageId, // pageId가 존재할 때만 쿼리 실행
        }
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <div>
            {page && (
                <div>
                    <header>
                        <DetailHeader page={page} />
                    </header>
                    <div>
                        <VariableContainer
                            variables={page.variables}
                            pageId={page.pageId}
                        />
                    </div>
                    <div>
                        <FunctionContainer
                            functions={page.functions}
                            pageId={page.pageId}
                        />
                    </div>
                    <button onClick={() => console.log(page)}>
                        show page info
                    </button>
                </div>
            )}
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
