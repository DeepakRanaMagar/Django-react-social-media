// export const randomAvatar = () =>
// `https://i.pravatar.cc/300?img=${Math.floor(Math.random()*60) + 1}`;

export const randomAvatar = () => {
    let avatarIdentifier = localStorage.getItem('avatarIdentifier');

    if (!avatarIdentifier) {
        avatarIdentifier = Math.floor(Math.random() * 60) + 1;
        localStorage.setItem('avatarIdentifier', avatarIdentifier);
    }

    return `https://i.pravatar.cc/300?img=${avatarIdentifier}`;
};
