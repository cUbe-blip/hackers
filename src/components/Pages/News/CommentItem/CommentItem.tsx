import { Comment, fetchComments } from '~API/hacker-news-rest-api';
import { AppConfig } from '~constant/consts';
import { useState } from 'react';
import './commentItem.scss';

interface CommentItemProps {
  comment: Comment;
  level?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, level = 0 }) => {
  const [replies, setReplies] = useState<Comment[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const canShowReplies = level < AppConfig.comments.maxDepth;

  const handleExpandClick = async () => {
    if (!isExpanded && comment.kids) {
      const repliesData = await Promise.all(comment.kids.map(fetchComments));
      setReplies(repliesData.flat());
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`comment comment--level-${level}`}>
      <div className="comment__content">
        <div className="comment__meta">
          <span className="comment__author">{comment.by}</span>
          <span className="comment__date">
            {new Date(comment.time * 1000).toLocaleString()}
          </span>
        </div>

        <div
          className="comment__text"
          dangerouslySetInnerHTML={{ __html: comment.text || '' }}
        />

        {canShowReplies && comment.kids && (
          <button
            className="comment__expand-button"
            onClick={handleExpandClick}
          >
            {isExpanded ? '[-]' : `[+] ${comment.kids.length} replies`}
          </button>
        )}
      </div>

      {isExpanded && replies.length > 0 && (
        <div className="comment__replies">
          {replies.map((reply) => (
            <CommentItem comment={reply} key={reply.id} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
