/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addChild, editItSelf } from '../../store/contextMenuSlice';
import * as pageAPI from '../../utils/api/aws/pageRoutes';
import * as functionAPI from '../../utils/api/aws/functionRoutes';
import * as variableAPI from '../../utils/api/aws/variableRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export default function PageContextMenu({ item }) {
    const dispatch = useDispatch();

    const queryClient = useQueryClient();

    const { mutate: deletePage } = useMutation({
        mutationFn: ({ pageId }) => {
            return pageAPI.deletePage(pageId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    const { mutateAsync: deleteVariables } = useMutation({
        mutationFn: ({ pageId }) => {
            return variableAPI.deleteVariablesInPage(pageId);
        },
    });

    const { mutateAsync: deleteFunctions } = useMutation({
        mutationFn: ({ pageId }) => {
            return functionAPI.deleteFunctionsInPage(pageId);
        },
    });

    const startRename = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(editItSelf({ name: item.pageName, id: item.pageId }));
    };

    const startAddFunction = (e) => {
        dispatch(
            addChild({
                addType: 'function',
                name: item.pageName,
                id: item.pageId,
            })
        );
        e.stopPropagation();
    };

    const startAddVariable = (e) => {
        dispatch(
            addChild({
                addType: 'variable',
                name: item.pageName,
                id: item.pageId,
            })
        );
        e.stopPropagation();
    };

    const startDelete = async () => {
        try {
            if (item.variables.length > 0) {
                await deleteVariables({ pageId: item.pageId });
            }
            if (item.functions.length > 0) {
                await deleteFunctions({ pageId: item.pageId });
            }
            deletePage({ pageId: item.pageId });
        } catch (error) {
            console.error('Error during deletion:', error);
        }
    };

    return (
        <div>
            <div onClick={(e) => startRename(e)}>Rename</div>
            <div onClick={(e) => startAddVariable(e)}>New Variable</div>
            <div onClick={(e) => startAddFunction(e)}>New Function</div>
            <div onClick={() => startDelete()}>Delete</div>
        </div>
    );
}
