# Asset Management Web Application

고객의 자산을 체계적으로 관리하고 분석할 수 있는 웹 애플리케이션입니다.

> **개발 기간**: 2020.03.27 ~ 2020.05.03

## 주요 기능

### 1. 사용자 인증 시스템

- 회원가입 및 로그인 (Passport.js 로컬 전략)
- bcrypt를 활용한 비밀번호 암호화
- 세션 기반 인증 관리
- 관리자 승인 후 서비스 이용 가능
- 관리자/일반 사용자 권한 분리

### 2. 고객 관리

- 고객 정보 등록 (이름, 성별, 생년월일, 연락처)
- 담당 고객 목록 조회 및 검색
- 고객별 상세 정보 관리

### 3. 자산 관리

- 고객별 자산 등록/수정/삭제
- 다양한 자산 속성 관리
  - 투자 목적 및 목표 금액
  - 자산 구분 (예금, 펀드, 주식 등)
  - 월/연 투자 금액, 현재 평가 금액
  - 투자 기간 (단기/중기/장기/유동성)
  - 위험도 (안정형/성장형 등)
  - 기대 수익률, 통화 구분
- 가족 구성원별 자산 관리
- 분기별 자산 현황 관리

### 4. 자산 분석 및 시각화

Chart.js를 활용한 데이터 시각화

- 투자 목적별 자금 분포 (도넛 차트)
- 자산 구분별 분포 (도넛 차트)
- 투자 기간별 자금 현황 (막대 차트)
- 위험도별 자금 분포 (막대 차트)
- 원화/달러 자산 비중 (도넛 차트)
- 총 수익률 및 자산 비중 자동 계산

### 5. 관리자 기능

- 신규 가입 사용자 승인/거절
- 전체 고객 현황 조회

## 기술 스택

### Frontend

| 기술         | 버전 | 설명                        |
| ------------ | ---- | --------------------------- |
| **Nuxt.js**  | 2.18 | Vue.js 기반 SSR 프레임워크  |
| **Vue.js**   | 2.7  | 프론트엔드 프레임워크       |
| **Vuetify**  | 2.7  | Material Design UI 컴포넌트 |
| **Axios**    | 1.7  | HTTP 클라이언트             |
| **Chart.js** | 2.9  | 데이터 시각화 라이브러리    |

### Backend

| 기술                | 버전 | 설명                            |
| ------------------- | ---- | ------------------------------- |
| **Express.js**      | 4.21 | Node.js 웹 프레임워크           |
| **Sequelize**       | 6.37 | ORM (Object-Relational Mapping) |
| **MySQL**           | -    | 관계형 데이터베이스             |
| **Passport.js**     | 0.7  | 인증 미들웨어                   |
| **bcrypt**          | 5.1  | 비밀번호 해싱                   |
| **express-session** | 1.18 | 세션 관리                       |

### Security

| 기술       | 설명                               |
| ---------- | ---------------------------------- |
| **helmet** | HTTP 보안 헤더 설정                |
| **hpp**    | HTTP Parameter Pollution 방지      |
| **cors**   | Cross-Origin Resource Sharing 설정 |

### DevOps

| 기술        | 설명                  |
| ----------- | --------------------- |
| **PM2**     | Node.js 프로세스 관리 |
| **nodemon** | 개발 환경 자동 재시작 |

## 프로젝트 구조

```
asset-management-web/
├── backend/
│   ├── app.js                 # Express 앱 진입점
│   ├── config/
│   │   └── config.js          # DB 설정
│   ├── models/
│   │   ├── index.js           # Sequelize 초기화
│   │   ├── user.js            # 사용자 모델
│   │   ├── customer.js        # 고객 모델
│   │   ├── asset.js           # 자산 모델
│   │   ├── family.js          # 가족 모델
│   │   └── quarter.js         # 분기 모델
│   ├── routes/
│   │   ├── user.js            # 사용자 API
│   │   └── customer.js        # 고객/자산 API
│   ├── passport/
│   │   └── index.js           # Passport 설정
│   └── package.json
│
├── frontend/
│   ├── nuxt.config.js         # Nuxt 설정
│   ├── pages/
│   │   ├── index.vue          # 메인 페이지
│   │   ├── login.vue          # 로그인
│   │   ├── signup.vue         # 회원가입
│   │   └── manage/
│   │       ├── admin/         # 관리자 페이지
│   │       │   ├── home.vue
│   │       │   ├── approve.vue
│   │       │   ├── profile.vue
│   │       │   └── customer/
│   │       └── auth/          # 일반 사용자 페이지
│   │           ├── home.vue
│   │           ├── profile.vue
│   │           └── customer/
│   ├── components/
│   │   ├── AssetComponents.vue  # 자산 테이블 및 차트
│   │   ├── AddAsset.vue
│   │   ├── AddFamily.vue
│   │   ├── ManageAuth.vue
│   │   └── ProfileSetting.vue
│   ├── store/                 # Vuex 스토어
│   ├── middleware/            # 인증 미들웨어
│   ├── layouts/               # 레이아웃
│   └── package.json
│
└── README.md
```

## 데이터베이스 스키마

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    User     │     │  Customer   │     │   Family    │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id          │     │ id          │     │ id          │
│ userId      │────<│ UserId (FK) │     │ name        │
│ password    │     │ name        │     │ CustomerId  │
│ name        │     │ gender      │     └──────┬──────┘
│ gender      │     │ birth       │            │
│ phone       │     │ phone       │            │
│ position    │     └──────┬──────┘            │
│ department  │            │                   │
│ adminState  │            │                   │
│ approveState│     ┌──────┴──────┐            │
└─────────────┘     │             │            │
                    ▼             ▼            ▼
              ┌─────────────────────────────────────┐
              │              Asset                  │
              ├─────────────────────────────────────┤
              │ id, purpose, goal, depart, name     │
              │ month_ex, month_real, year, total   │
              │ present, enddate, term, risk        │
              │ ex_bm, money, date, startdate       │
              │ account, addition                   │
              │ customerId (FK), FamilyId (FK)      │
              │ quarterId (FK)                      │
              └─────────────────────────────────────┘
```

## 시작하기

### 요구사항

- Node.js 18.x 이상
- MySQL 5.7 이상

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/asset-management-web.git
cd asset-management-web

# Backend 설치
cd backend
npm install

# Frontend 설치
cd ../frontend
npm install
```

### 환경변수 설정

```bash
# backend/.env
cp backend/.env.example backend/.env

# frontend/.env
cp frontend/.env.example frontend/.env
```

**backend/.env**

```
DB_PASSWORD=your_database_password
COOKIE_SECRET=your_cookie_secret_here
CORS_ORIGIN=http://localhost:3000
PORT=3085
NODE_ENV=development
```

**frontend/.env**

```
API_URL=http://localhost:3085
PORT=3000
NODE_ENV=development
```

### 데이터베이스 설정

```sql
CREATE DATABASE `wdfo-asset` CHARACTER SET utf8 COLLATE utf8_general_ci;
```

### 실행

```bash
cd backend
npm run dev
```

```
cd frontend
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3085
