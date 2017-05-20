export const MOVE_DONE = 'MOVE_DONE';

export function createMove(position){
    return {
        type: MOVE_DONE,
        position: position
    };
}