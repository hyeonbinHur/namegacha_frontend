import { BsChatSquareDotsFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as pageAPI from '../utils/api/aws/pageRoutes';
import DetailHeader from '../components/Details/Header/DetailHeader';
import VariableContainer from '../components/Details/Variables/VariableContainer';
import FunctionContainer from '../components/Details/Functions/FunctionContainer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DetailPage() {
    const params = useParams();
    const [pageId, setPageId] = useState(null);
    const navigate = useNavigate();

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
        <div className="detail">
            {page && (
                <div className="detail">
                    <header className="detail--header">
                        <DetailHeader page={page} />
                    </header>
                    <section className="detail--variable">
                        <VariableContainer
                            variables={page.variables}
                            pageId={page.pageId}
                        />
                    </section>
                    <section className="detail--functions">
                        <FunctionContainer
                            functions={page.functions}
                            pageId={page.pageId}
                        />
                    </section>
                    <BsChatSquareDotsFill
                        onClick={() => navigate('/')}
                        className="detail--btns"
                    />
                </div>
            )}
        </div>
    );
}
