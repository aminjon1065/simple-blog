import { CommentNode } from '@/types/news';
import { Button } from '@/components/ui/button';

const CommentItem = ({
    c,
    onReply,
}: {
    c: CommentNode;
    onReply: (c: CommentNode) => void;
}) => {
    return (
        <div className="rounded-md border p-3 dark:border-gray-700">
            <div className="mb-1 flex items-center justify-between">
                <div className="text-sm font-medium dark:text-gray-100">
                    {c.user?.name}
                </div>
                <div className="text-xs text-gray-500">
                    {new Date(c.created_at).toLocaleString()}
                </div>
            </div>

            <p className="text-sm whitespace-pre-wrap dark:text-gray-200">
                {c.comment}
            </p>

            <div className="mt-2">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onReply(c)}
                    className="h-7 px-2"
                >
                    Ответить
                </Button>
            </div>

            {c.children && c.children.length > 0 && (
                <div className="mt-3 ml-4 space-y-3 border-l pl-3 dark:border-gray-700">
                    {c.children.map((child) => (
                        <CommentItem
                            key={child.id}
                            c={child}
                            onReply={onReply}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;
