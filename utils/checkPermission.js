import { UnAuthenticated } from '../errors/index.js';

const checkPermission = (requestUser, resourceUserId) => {
    if (requestUser.userId === resourceUserId.toString()) return;

    throw new UnAuthenticated('Bạn không có quyền sửa đổi!');
};

export default checkPermission;
