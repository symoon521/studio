export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  plan: string;
  createdAt: string;
}

const USERS_KEY = 'devopsbuddy_users';
const CURRENT_USER_KEY = 'devopsbuddy_current_user';

// 로컬 스토리지에서 사용자 목록 가져오기
export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
}

// 로컬 스토리지에 사용자 목록 저장
export function saveUsers(users: User[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// 새 사용자 등록
export function registerUser(userData: Omit<User, 'id' | 'createdAt'>): { success: boolean; message: string; user?: User } {
  const users = getUsers();
  
  // 이메일 중복 체크
  if (users.find(user => user.email === userData.email)) {
    return { success: false, message: '이미 등록된 이메일입니다.' };
  }
  
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return { success: true, message: '회원가입이 완료되었습니다.', user: newUser };
}

// 로그인
export function loginUser(email: string, password: string): { success: boolean; message: string; user?: User } {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' };
  }
  
  // 현재 로그인한 사용자 저장
  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }
  
  return { success: true, message: '로그인 성공', user };
}

// 현재 로그인한 사용자 가져오기
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

// 로그아웃
export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

// 인증 상태 확인
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}