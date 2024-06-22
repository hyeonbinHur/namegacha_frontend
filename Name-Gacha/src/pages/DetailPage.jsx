import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
    } = useQuery({
        queryKey: ['getPageInfo', pageId],
        queryFn: () => pageAPI.getPage(pageId),
        enabled: !!pageId,
    });

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
