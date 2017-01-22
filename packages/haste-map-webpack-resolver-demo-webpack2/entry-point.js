import {dependency} from 'Dependency';

export function entryPoint() {
    return `${dependency()} resolved`;
}
