<body><article id="4949a63b-08aa-4c54-aeea-46b868381bae" class="page sans"><header><div class="page-header-icon undefined"><span class="icon">🕹️</span></div><h1 class="page-title">서버: API Docs</h1></header><div class="page-body"><p id="27dcfc4f-c3f3-4635-b852-12897c790d05" class="">baseURL: <a href="http://xx.xx.xxx.xx:4000/">http://xx.xx.xxx.xx:4000 (보안을 위해 가렸습니다)</a></p><ul id="4652a373-38ea-4e6e-9352-6c4e48b84602" class="toggle"><li><details open=""><summary>api</summary><ul id="2fc15c0c-bc22-4e5a-9138-642873e1465f" class="toggle"><li><details open=""><summary>공통사항</summary><ul id="fc88d389-1572-46a6-a6fd-f92ac18afd51" class="bulleted-list"><li>리턴 형식:<p id="587d81e6-e39f-4b1e-ba42-1127003b3c19" class="">모든 요청은 JSON형식의 데이터를 리턴합니다. </p><p id="b3413bcf-dc20-4fdd-a949-0d72b6b8b45e" class="">
</p></li></ul><ul id="a179eb1c-bcbd-4063-b8c9-cf5b49b606c6" class="bulleted-list"><li>리턴하는 항목:<p id="ff600997-303f-4e35-9bcb-57c33b335612" class="">각 요청이 리턴하는 데이터입니다. 이 때 괄호 안의 항목은 아직 구현되지 않은 부분입니다.</p><p id="7139fe90-cf40-4cdb-a90e-d4b36495509d" class="">*리턴항목 중 _v는 아무것도 아니니 무시하셔도 됩니다!</p><p id="974f0f21-1d73-4bbc-9fb6-ef0b092bf1f7" class="">
</p></li></ul><ul id="db2c13f1-9b2d-430e-a6f6-2f5c2f454984" class="bulleted-list"></ul></details></li></ul><ul id="69bbb516-a2da-46b8-9926-2b4e0e25da0a" class="toggle"><li><details open=""><summary>posts</summary><pre id="e278a6f8-bf3d-4058-aff7-c100ab0dd603" class="code"><code>GET <mark class="highlight-blue">/api/v1/posts</mark></code></pre><p id="5381c066-8d64-485e-ba21-0133a40bcf1c" class="">@GET : 화면별 / 페이지별 포스트 목록을 불러옵니다. 구분을 위해 쿼리스트링을 사용합니다.</p><div class="indented"><ul id="4ccdee2b-2c67-4452-b45f-bed127142b65" class="bulleted-list"><li>image_type = "desktop"이면 데스크톱 이미지, image_type = "mobile"이면 모바일 이미지, 값이 없을 경우 모든 이미지를 리턴합니다.</li></ul><ul id="6504416b-9aa6-4b42-b2de-ccbc597cd668" class="bulleted-list"><li>page=1이면 1~20번째, page=2면 21~40번째, 값이 없을 경우 모든 이미지를 리턴합니다.</li></ul><pre id="878f1e9a-ad3f-4259-b506-efdc34167823" class="code"><code>&lt;예시&gt;
/api/v1/posts?image_type=desktop&amp;page=1 : 데스크톱 posts 1~20번째 조회
/api/v1/posts?image_type=mobile&amp;page=2 : 모바일 posts 21~40번째 조회
/api/v1/posts : 모든 이미지 전체조회
등등..</code></pre><p id="977c6f08-745e-4e34-8941-086779ebc13e" class="">리턴하는 항목: 각 포스트의 _id, image, imageType, location, time, creatorId</p><p id="711cb88e-7f72-47ff-b944-bea084b29736" class="">
</p><p id="307a99cf-fa06-469a-becd-7f77694698f0" class="">
</p></div><p></p><pre id="9de18558-31be-4aec-a6a0-98981061607f" class="code"><code>POST <mark class="highlight-blue">/api/v1/posts/desktop</mark>
or
POST <mark class="highlight-blue">/api/v1/posts/mobile</mark></code></pre><p id="71c91113-4703-4b0c-8ad4-851fda5d2671" class="">@POST: 포스트 하나를 업로드합니다. desktop / mobile 여부에 따라 이미지가 리사이징되어 업로드됩니다.</p><div class="indented"><p id="e0f4b8c6-935a-47d5-b329-3731dbcad413" class="">바디에 담아주어야 하는 항목: image, location, time</p><p id="25ee166c-028d-441b-b7ef-321833457a59" class="">리턴하는 항목: 생성된 포스트의 _id, image, imageType, location, time, creatorId, createdAt</p></div><p></p><p id="b6ff0dc3-8836-49bd-9876-64e07685e3e8" class="">
</p><p id="3525d328-ddba-44c1-82a8-2b6bc990475c" class="">
</p><pre id="3e4161d7-641c-42ac-b8a0-2d8d9fe62ed5" class="code"><code>*** 이건 아직 사용하지 않습니다 *** PUT / DELETE <mark class="highlight-blue">/api/v1/posts/:postId</mark></code></pre><p id="af20355e-2b44-4539-9ee0-6d96e41c9fc0" class="">@PUT: 해당 id를 갖고 있는 포스트를 수정합니다.</p><div class="indented"><p id="485741b9-4d93-4383-ab34-c1ec390706c1" class="">리턴하는 항목: 수정된 포스트의 _id, image, imageType, location, time, ()</p></div><p></p><p id="2376e72e-9053-432d-b539-00d555d0abe1" class="">
</p><p id="dd384f67-0938-431a-8a1f-c9584912b791" class="">@DELETE: 해당 id를 갖고 있는 포스트를 삭제합니다.</p><div class="indented"><p id="1a3e1487-e2e5-43b6-8622-69c025671169" class="">리턴하는 항목: 삭제된 포스트의 _id, image, imageType, location, time, creatorId</p><p id="a8c70298-ee8b-42c2-95d9-52d8e4ddcd1f" class="">
</p></div><p></p><p id="7045d14d-a4a0-4571-91aa-8fb673a6c8ab" class="">
</p><pre id="cae28752-cbc1-4257-ab90-539e3c12031c" class="code"><code>POST <mark class="highlight-blue">/api/v1/posts/toggleLike/:postId</mark></code></pre><p id="5069fc63-550b-4b31-abf4-a471224232bb" class="">@POST: 현재 로그인된 유저가 해당 id를 갖고 있는 포스트에 좋아요를 누르거나 취소합니다.</p><div class="indented"><p id="985fb597-053a-4b23-a5d4-80f5f59dd53f" class="">리턴하는 항목: 해당 id를 갖고 있는 포스트의 _id, image, imageType, location, time, creatorId</p><p id="738205b8-c149-43ff-a500-786e0517d012" class="">
</p><p id="7e131247-0a6b-4808-93f6-73a37c19aef7" class="">
</p></div><p></p><pre id="443a2030-4203-47cf-b71a-5a13db372f75" class="code"><code>GET <mark class="highlight-blue">/api/v1/posts/liked</mark></code></pre><p id="cccbe4aa-244d-48a7-8acc-a709bd2e1fcf" class="">@GET: 현재 로그인된 유저가 좋아요를 누른 포스트를 조회합니다.</p><div class="indented"><p id="92fad8ba-f6e5-4dcb-8bce-9e2dd82144ad" class="">리턴하는 항목: 좋아요한 포스트의 배열: _id</p><p id="4d74617a-95bd-4898-a678-7b766a249f05" class="">
</p><p id="007b9c38-5315-44f1-9160-3fc7dc98c1e0" class="">
</p></div><p></p><pre id="9cbe5e23-a7d9-45b7-8371-d027bf4ffb8f" class="code"><code>GET <mark class="highlight-blue">/api/v1/posts/my</mark></code></pre><p id="1ede8f0d-6a15-41e6-9948-78b697b6bdf1" class="">@GET: 현재 로그인된 유저가 작성한 포스트를 조회합니다.</p><div class="indented"><p id="1cd05660-6c7c-46c7-ac1c-b10307530d68" class="">리턴하는 항목: 유저가 작성한 포스트의 배열:  _id, image, imageType, location, time, creatorId</p></div><p></p><p id="c2891193-78d8-4414-ac87-013a1458a44e" class="">
</p></details></li></ul><ul id="68421746-ae79-4444-acd4-c6ed4690b0a5" class="toggle"><li><details open=""><summary>users</summary><p id="b4c75433-03d8-45a3-8f6f-3b827bfd1544" class="">
</p><pre id="b9813812-c1a8-4440-8d32-0997e568f80b" class="code"><code>POST <mark class="highlight-blue">/api/v1/users/auth/login</mark></code></pre><p id="7baef623-e438-483d-9814-a7ac55497730" class="">@POST: 회원가입이 안 되어있으면 회원가입을 하고, 가입되어 있으면 로그인합니다.</p><p id="d3f90b89-ed1d-4595-b32e-16566202d6f7" class="">
</p><p id="0e7b59f6-5a63-49e8-b9e5-4df2ed8a4549" class="">
</p><pre id="624c8065-4d51-4611-8385-916f91b52d2d" class="code"><code>GET <mark class="highlight-blue">/api/v1/users</mark></code></pre><p id="e51ce9aa-ad54-4349-b667-799d78ca45d0" class="">@GET: 해당 id를 갖고 있는 유저를 불러옵니다.</p><div class="indented"><p id="78eeb375-8b56-438c-95a7-c291f2872bb1" class="">리턴하는 항목: 유저의 _id, username, likedPosts (각 포스트의 _id)</p></div><p></p><p id="49e4172d-ade2-4524-993e-c101b258c8e9" class="">
</p></details></li></ul></details></li></ul></div></article></body>