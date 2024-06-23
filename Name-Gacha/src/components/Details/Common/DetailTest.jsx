/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as pageAPI from '../../../utils/api/aws/pageRoutes';
import { deleteVariablesInPage } from '../../../utils/api/aws/variableRoutes';
import { deleteFunctionsInPage } from '../../../utils/api/aws/functionRoutes';
import * as detailReducers from '../../../store/detailPageSlice';
import { useDispatch } from 'react-redux';
import DetailForm from './DetailForm';
export default function DetailTest({ page }) {
    //page
    const componentTarget = {
        type: 'page',
        name: page.pageName,
        id: page.pageId,
        exp: page.pageExp,
    };
    const queryClient = useQueryClient();
    const { mutate: mutateUpdatePage } = useMutation({
        mutationFn: ({ pageName, pageExp, pageId }) =>
            pageAPI.updatePage(pageId, pageName, pageExp),
        onSuccess: () => queryClient.invalidateQueries('getCertainProjects'),
    });
    const { mutate: mutateDeletePage } = useMutation({
        mutationFn: ({ pageId }) => pageAPI.deletePage(pageId),
        onSuccess: () => queryClient.invalidateQueries('getCertainProjects'),
    });
    const { mutateAsync: mutateDeleteVariable } = useMutation({
        mutationFn: ({ pageId }) => deleteVariablesInPage(pageId),
    });
    const { mutateAsync: mutateDeleteFunction } = useMutation({
        mutationFn: ({ pageId }) => deleteFunctionsInPage(pageId),
    });
    const handleDeletePage = async () => {
        try {
            if (page.variables.length > 0) {
                await mutateDeleteVariable({ pageId: page.pageId });
            }
            if (page.functions.length > 0) {
                await mutateDeleteFunction({ pageId: page.pageId });
            }
            mutateDeletePage({ pageId: page.pageId });
        } catch (error) {
            console.error('Failed to delete page:', error);
        }
    };
    const dispatch = useDispatch();
    const handleSaveEdit = (newName, newExp) => {
        mutateUpdatePage({
            pageId: page.pageId,
            pageName: newName,
            pageExp: newExp,
        });
        dispatch(detailReducers.setClear());
    };
    const startEdit = () => {
        dispatch(detailReducers.setIsEdit({ target: componentTarget }));
    };
    return (
        <div>
            <DetailForm
                componentTarget={componentTarget}
                type="Edit"
                apiAction={handleSaveEdit}
                startAction={startEdit}
                deleteAction={handleDeletePage}
            />
        </div>
    );
}
// export default function DetailTest() { // container
//     return <div></div>;
// }
// export default function DetailTest() { // card
//     return <div></div>;
// }
