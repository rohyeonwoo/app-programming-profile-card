import React, { useState } from 'react';
import './ProfileCard.css';

function ProfileCard(props) {
  // 좋아요 상태 관리
  const [likeCount, setLikeCount] = useState(0);

  // 좋아요 버튼 클릭 핸들러
  const handleLike = () => {
    setLikeCount (likeCount + 1)
  }

  return (
    <div className="profileCard">
      <div className="top">
        <div className="badge">노</div>
        <div>
          <div className="name">{props.name}</div>
          <div className="meta">학번: {props.studentId}</div>
          <div className="meta">전공: {props.major}</div>
        </div>
      </div>

      <p className="introduce">
        안녕하세요! React 컴포넌트를 배우고 있는 {props.name}입니다.
      </p>

      <div className="bottom">
        <button className="likeBtn" onClick={handleLike}>b 좋아요</button>
        <span className="count">좋아요 {likeCount}개</span>
      </div>
    </div>
  );
}

export default ProfileCard;