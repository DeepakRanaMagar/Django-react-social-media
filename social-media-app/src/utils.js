// export const randomAvatar = () =>
// `https://i.pravatar.cc/300?img=${Math.floor(Math.random()*60) + 1}`;

export const randomAvatar = () => {
    // Check if the identifier is already stored in local storage
    let avatarIdentifier = localStorage.getItem('avatarIdentifier');

    // If not, generate a new identifier and store it in local storage
    if (!avatarIdentifier) {
        avatarIdentifier = Math.floor(Math.random() * 60) + 1;
        localStorage.setItem('avatarIdentifier', avatarIdentifier);
    }

    // Use the stored identifier to generate the avatar URL
    return `https://i.pravatar.cc/300?img=${avatarIdentifier}`;
};
