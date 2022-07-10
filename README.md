# 코드가 많이 더럽습니다🙈 (리팩토링 중:2022년6월24일 시작)
# 생리기록달력 만들기🦖
# 🚀 배포
[배포 페이지 가기](https://finaly-im-gonna-make-it.netlify.app/)

# 🔧 기술 스택
- Typescript
- React
- Redux-toolkit
- Axios
- SCSS

# 📌 실행 방법

```
git clone https://github.com/hamkke/last_assignment.git
```
```
yarn install && yarn start
``` 
# 📁 폴더 구조
```sh
src
 ┣ assets
 ┃ ┗ svgs
 ┣ components
 ┃ ┣ calrendar
 ┃ ┃ ┣ calrendar.module.scss
 ┃ ┃ ┣ getDay.tsx
 ┃ ┃ ┗ index.tsx
 ┃ ┣ dateList
 ┃ ┃ ┣ dateList.module.scss
 ┃ ┃ ┗ index.tsx
 ┃ ┣ layout
 ┃ ┃ ┣ index.tsx
 ┃ ┃ ┗ layout.module.scss
 ┃ ┣ modal
 ┃ ┃ ┣ Modal.tsx
 ┃ ┃ ┣ Potal.tsx
 ┃ ┃ ┗ modal.module.scss
 ┃ ┗ .DS_Store
 ┣ routes
 ┃ ┗ index.tsx
 ┣ states
 ┃ ┣ index.ts
 ┃ ┗ userData.ts
 ┣ types
 ┃ ┗ dayList.d.ts
 ┗ utils
   ┗ axios.ts
 ```

# 🎨 디자인
![메인화면](https://user-images.githubusercontent.com/46497281/172038398-eda0ad1c-a512-4255-9513-f66f7b30561c.png)

![모달](https://user-images.githubusercontent.com/46497281/172038417-f41d2154-4938-42db-9e87-8107e9c7b969.png)

1. 평균 주기를 보여준다 <strong>(구현(O))</strong>
2. 지난 기록들을 리스트로 보여준다 <strong>(구현(O))</strong>
3. 스크롤 가능 <strong>(구현(O))</strong>
4. 이전 달력 보기 버튼 <strong>(구현(O))</strong>
5. 현재 월 보기 <strong>(구현(O))</strong>
6. 다음 달력 보기 버튼 <strong>(구현(O))</strong>
7. 시작일 텍스트 <strong>(구현(O))</strong>
8. 시작일을 기준으로 마지막일을 표시하면 기간에 해당하는 달력에 배경색이 생긴다 <strong>(구현(O))</strong>
9. 날짜를 누르면 모달창 나옴 <strong>(구현(O))</strong>
10. 모달창 <strong>(구현(O))</strong>
11. 선택한 날짜 <strong>(구현(O))</strong>
12. 시작일 버튼 > 누르면 해당날짜에 텍스트 생김 <strong>(구현(O))</strong>
13. 마지막일 버튼 > 누르면 해당날짜에 텍스트 생김 <strong>(구현(O))</strong>
14. 메모장 기능 <strong>(구현(O))</strong>
15. 날짜의 배경색 지정 <strong>(구현(O))</strong>
16. 닫기 버튼 <strong>(구현(O))</strong>
17. 확인 버튼, 버튼을 누르면 모달창이 닫힘 <strong>(구현(O))</strong>
18. 리덕스에 데이터를 저장해 리렌더링이 되도 데이터가 없어지지 않는다 <strong>(구현(O))</strong>

## 추가예정(2022년7월10일 추가 완료)
1. 파이어베이스 연결하기
2. 생리주기,평균주기 계산하기
3. 생리주기 그래프 그리기
4. 반응형 맞추기



# 📸 구현 결과

<p>
<img align="left" src="https://user-images.githubusercontent.com/46497281/172038683-40a18eb0-5475-4118-999b-7e9a36688a91.png" width="300px">

<img align="right" src="https://user-images.githubusercontent.com/46497281/173219326-460e8a16-1fe7-4283-83a6-f734a332b9eb.png" width="300px">
</p>






