type Props = {
  type: 'articles' | 'jsonContents' | 'mediaFolders'
}

export const EmptyState = ({ type }: Props) => {
  if (type === 'articles') {
    return (
      <svg className="opacity-70" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M33.5722 28.7998C29.7366 28.7998 26.3881 31.398 25.4354 35.1134L19.604 57.8558C19.3224 58.9544 19.2661 60.0986 19.4385 61.2195L20.6003 68.7714C21.3724 68.5998 22.166 68.4854 22.9765 68.4329L21.8106 60.8545C21.6874 60.0539 21.7276 59.2366 21.9288 58.4519L27.7602 35.7095C28.4407 33.0557 30.8325 31.1998 33.5722 31.1998H87.6289C90.3686 31.1998 92.7604 33.0557 93.4408 35.7096L99.2722 58.4519C99.4734 59.2366 99.5136 60.0539 99.3905 60.8545L96.0028 82.8744C95.5525 85.8014 93.034 87.9621 90.0726 87.9621H39.0929C38.8759 88.791 38.5924 89.593 38.2484 90.3621H90.0726C94.2186 90.3621 97.7445 87.3371 98.3749 83.2394L101.763 61.2195C101.935 60.0986 101.879 58.9544 101.597 57.8558L95.7656 35.1135C94.813 31.398 91.4645 28.7998 87.6289 28.7998H33.5722Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M40.451 60.7809H21.1582V58.3809H41.0686C41.4561 58.3809 41.8198 58.568 42.0451 58.8834L47.4763 66.4872C48.6026 68.0639 50.421 68.9997 52.3587 68.9997H69.5992C71.5369 68.9997 73.3553 68.0639 74.4816 66.4872L79.9129 58.8834C80.1381 58.568 80.5018 58.3809 80.8893 58.3809H100.8V60.7809H81.5069L76.4345 67.8821C74.8578 70.0896 72.312 71.3997 69.5992 71.3997H52.3587C49.6459 71.3997 47.1001 70.0896 45.5234 67.8821L40.451 60.7809Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M29.8193 49.9697C29.8193 46.656 32.5056 43.9697 35.8193 43.9697H85.3816C88.6953 43.9697 91.3816 46.656 91.3816 49.9697V57.6226C91.3816 58.2415 90.9109 58.7588 90.2948 58.8172C89.6786 58.8756 89.1191 58.4558 89.0029 57.8479L88.7402 56.4733C88.1996 53.6452 85.7262 51.5998 82.8469 51.5998H38.2638C35.2 51.5998 32.6283 53.9082 32.2987 56.9543L32.2124 57.7517C32.1438 58.3856 31.5914 58.8552 30.9547 58.8208C30.318 58.7865 29.8193 58.2602 29.8193 57.6226V49.9697Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M29.8184 57.5547C29.8184 54.241 32.5047 51.5547 35.8184 51.5547H85.3806C88.6943 51.5547 91.3806 54.241 91.3806 57.5547V58.8226H88.9806V57.5547C88.9806 55.5665 87.3688 53.9547 85.3806 53.9547H35.8184C33.8301 53.9547 32.2184 55.5665 32.2184 57.5547V58.8226H29.8184V57.5547Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M29.8184 42.3848C29.8184 39.0711 32.5047 36.3848 35.8184 36.3848H85.3806C88.6943 36.3848 91.3806 39.0711 91.3806 42.3848V59.6376H88.9806V42.3848C88.9806 40.3965 87.3688 38.7848 85.3806 38.7848H35.8184C33.8301 38.7848 32.2184 40.3965 32.2184 42.3848V59.6376H29.8184V42.3848Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M101.875 26.9345C100.129 26.9079 98.6922 28.3015 98.6656 30.0474C98.6389 31.7932 100.033 33.2301 101.778 33.2568L108.281 33.3562C110.027 33.3829 111.464 31.9892 111.491 30.2434C111.518 28.4975 110.124 27.0606 108.378 27.0339L101.875 26.9345ZM101.065 30.084C101.072 29.6635 101.418 29.3278 101.838 29.3343L108.341 29.4337C108.762 29.4401 109.098 29.7862 109.091 30.2067C109.085 30.6272 108.739 30.9629 108.318 30.9565L101.815 30.8571C101.395 30.8507 101.059 30.5046 101.065 30.084Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M91.9859 16.9111C92.0125 15.1653 93.4495 13.7716 95.1953 13.7983C96.9412 13.825 98.3348 15.2619 98.3081 17.0078L98.2088 23.5108C98.1821 25.2566 96.7451 26.6503 94.9993 26.6236C93.2535 26.5969 91.8598 25.16 91.8865 23.4142L91.9859 16.9111ZM95.1586 16.198C94.7381 16.1916 94.392 16.5273 94.3856 16.9478L94.2862 23.4508C94.2798 23.8714 94.6155 24.2175 95.036 24.2239C95.4565 24.2303 95.8026 23.8946 95.809 23.4741L95.9084 16.9711C95.9148 16.5506 95.5792 16.2045 95.1586 16.198Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M24.0002 69.6002C16.0473 69.6002 9.6002 76.0473 9.6002 84.0002C9.6002 91.9531 16.0473 98.4002 24.0002 98.4002C31.9531 98.4002 38.4002 91.9531 38.4002 84.0002C38.4002 76.0473 31.9531 69.6002 24.0002 69.6002ZM7.2002 84.0002C7.2002 74.7218 14.7218 67.2002 24.0002 67.2002C33.2786 67.2002 40.8002 74.7218 40.8002 84.0002C40.8002 93.2786 33.2786 100.8 24.0002 100.8C14.7218 100.8 7.2002 93.2786 7.2002 84.0002Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M21 76.2002C21 74.5433 22.3431 73.2002 24 73.2002C25.6569 73.2002 27 74.5433 27 76.2002V83.4002C27 85.057 25.6569 86.4002 24 86.4002C22.3431 86.4002 21 85.057 21 83.4002V76.2002ZM24 75.6002C23.6686 75.6002 23.4 75.8688 23.4 76.2002V83.4002C23.4 83.7316 23.6686 84.0002 24 84.0002C24.3314 84.0002 24.6 83.7316 24.6 83.4002V76.2002C24.6 75.8688 24.3314 75.6002 24 75.6002Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M21 91.7998C21 93.4567 22.3431 94.7998 24 94.7998C25.6569 94.7998 27 93.4567 27 91.7998C27 90.143 25.6569 88.7998 24 88.7998C22.3431 88.7998 21 90.143 21 91.7998ZM24 92.3998C23.6686 92.3998 23.4 92.1312 23.4 91.7998C23.4 91.4684 23.6686 91.1998 24 91.1998C24.3314 91.1998 24.6 91.4684 24.6 91.7998C24.6 92.1312 24.3314 92.3998 24 92.3998Z" fill="hsl(var(--muted-foreground))" />
      </svg>
    )
  }

  if (type === 'jsonContents') {
    return (
      <svg className="opacity-70" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.0004 27.5999C18.6985 27.5999 14.4004 31.898 14.4004 37.1999V83.9999C14.4004 89.3018 18.6985 93.5999 24.0004 93.5999H86.4558C91.7577 93.5999 96.0558 89.3018 96.0558 83.9999V81.5585C95.2366 81.4991 94.435 81.3765 93.6558 81.1954V83.9999C93.6558 87.9763 90.4322 91.1999 86.4558 91.1999H24.0004C20.0239 91.1999 16.8004 87.9763 16.8004 83.9999V37.1999C16.8004 33.2235 20.0239 29.9999 24.0004 29.9999H86.4558C90.4322 29.9999 93.6558 33.2235 93.6558 37.1999V50.8044C94.435 50.6233 95.2366 50.5007 96.0558 50.4413V37.1999C96.0558 31.898 91.7577 27.5999 86.4558 27.5999H24.0004Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M97.2004 51.5999C89.2475 51.5999 82.8004 58.047 82.8004 65.9999C82.8004 73.9528 89.2475 80.3999 97.2004 80.3999C105.153 80.3999 111.6 73.9528 111.6 65.9999C111.6 58.047 105.153 51.5999 97.2004 51.5999ZM80.4004 65.9999C80.4004 56.7215 87.922 49.1999 97.2004 49.1999C106.479 49.1999 114 56.7215 114 65.9999C114 75.2783 106.479 82.7999 97.2004 82.7999C87.922 82.7999 80.4004 75.2783 80.4004 65.9999ZM94.2004 58.1999C94.2004 56.543 95.5435 55.1999 97.2004 55.1999C98.8572 55.1999 100.2 56.543 100.2 58.1999V65.3999C100.2 67.0568 98.8572 68.3999 97.2004 68.3999C95.5435 68.3999 94.2004 67.0568 94.2004 65.3999V58.1999ZM97.2004 57.5999C96.869 57.5999 96.6004 57.8685 96.6004 58.1999V65.3999C96.6004 65.7313 96.869 65.9999 97.2004 65.9999C97.5318 65.9999 97.8004 65.7313 97.8004 65.3999V58.1999C97.8004 57.8685 97.5318 57.5999 97.2004 57.5999ZM94.2004 73.7999C94.2004 72.143 95.5435 70.7999 97.2004 70.7999C98.8572 70.7999 100.2 72.143 100.2 73.7999C100.2 75.4568 98.8572 76.7999 97.2004 76.7999C95.5435 76.7999 94.2004 75.4568 94.2004 73.7999ZM97.2004 73.1999C96.869 73.1999 96.6004 73.4685 96.6004 73.7999C96.6004 74.1313 96.869 74.3999 97.2004 74.3999C97.5318 74.3999 97.8004 74.1313 97.8004 73.7999C97.8004 73.4685 97.5318 73.1999 97.2004 73.1999Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M14.8898 43.4771C14.8898 42.8144 15.4271 42.2772 16.0898 42.2772H94.3668C95.0295 42.2772 95.5668 42.8144 95.5668 43.4771C95.5668 44.1399 95.0295 44.6771 94.3668 44.6771H16.0898C15.4271 44.6771 14.8898 44.1399 14.8898 43.4771Z" fill="hsl(var(--muted-foreground))" />
        <path d="M28.8004 36.5999C28.8004 38.2568 27.4572 39.5999 25.8004 39.5999C24.1435 39.5999 22.8004 38.2568 22.8004 36.5999C22.8004 34.943 24.1435 33.5999 25.8004 33.5999C27.4572 33.5999 28.8004 34.943 28.8004 36.5999Z" fill="hsl(var(--muted-foreground))" />
        <path d="M37.2004 36.5999C37.2004 38.2568 35.8572 39.5999 34.2004 39.5999C32.5435 39.5999 31.2004 38.2568 31.2004 36.5999C31.2004 34.943 32.5435 33.5999 34.2004 33.5999C35.8572 33.5999 37.2004 34.943 37.2004 36.5999Z" fill="hsl(var(--muted-foreground))" />
        <path d="M24.0004 56.9999C24.0004 56.0058 24.8063 55.1999 25.8004 55.1999H43.8004C44.7945 55.1999 45.6004 56.0058 45.6004 56.9999C45.6004 57.994 44.7945 58.7999 43.8004 58.7999H25.8004C24.8063 58.7999 24.0004 57.994 24.0004 56.9999Z" fill="hsl(var(--muted-foreground))" />
        <path d="M24.0004 66.5999C24.0004 65.6058 24.8063 64.7999 25.8004 64.7999H61.8004C62.7945 64.7999 63.6004 65.6058 63.6004 66.5999C63.6004 67.594 62.7945 68.3999 61.8004 68.3999H25.8004C24.8063 68.3999 24.0004 67.594 24.0004 66.5999Z" fill="hsl(var(--muted-foreground))" />
        <path d="M24.0004 76.1999C24.0004 75.2058 24.8063 74.3999 25.8004 74.3999H61.8004C62.7945 74.3999 63.6004 75.2058 63.6004 76.1999C63.6004 77.194 62.7945 77.9999 61.8004 77.9999H25.8004C24.8063 77.9999 24.0004 77.194 24.0004 76.1999Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M23.4004 56.9999C23.4004 55.6744 24.4749 54.5999 25.8004 54.5999H43.8004C45.1259 54.5999 46.2004 55.6744 46.2004 56.9999C46.2004 58.3254 45.1259 59.3999 43.8004 59.3999H25.8004C24.4749 59.3999 23.4004 58.3254 23.4004 56.9999ZM25.8004 55.7999C25.1376 55.7999 24.6004 56.3372 24.6004 56.9999C24.6004 57.6626 25.1376 58.1999 25.8004 58.1999H43.8004C44.4631 58.1999 45.0004 57.6626 45.0004 56.9999C45.0004 56.3372 44.4631 55.7999 43.8004 55.7999H25.8004ZM23.4004 66.5999C23.4004 65.2744 24.4749 64.1999 25.8004 64.1999H61.8004C63.1259 64.1999 64.2004 65.2744 64.2004 66.5999C64.2004 67.9254 63.1259 68.9999 61.8004 68.9999H25.8004C24.4749 68.9999 23.4004 67.9254 23.4004 66.5999ZM25.8004 65.3999C25.1376 65.3999 24.6004 65.9372 24.6004 66.5999C24.6004 67.2626 25.1376 67.7999 25.8004 67.7999H61.8004C62.4631 67.7999 63.0004 67.2626 63.0004 66.5999C63.0004 65.9372 62.4631 65.3999 61.8004 65.3999H25.8004ZM23.4004 76.1999C23.4004 74.8744 24.4749 73.7999 25.8004 73.7999H61.8004C63.1259 73.7999 64.2004 74.8744 64.2004 76.1999C64.2004 77.5254 63.1259 78.5999 61.8004 78.5999H25.8004C24.4749 78.5999 23.4004 77.5254 23.4004 76.1999ZM25.8004 74.9999C25.1376 74.9999 24.6004 75.5372 24.6004 76.1999C24.6004 76.8626 25.1376 77.3999 25.8004 77.3999H61.8004C62.4631 77.3999 63.0004 76.8626 63.0004 76.1999C63.0004 75.5372 62.4631 74.9999 61.8004 74.9999H25.8004Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M52.3619 17.3999C50.6158 17.3999 49.2004 18.8154 49.2004 20.5614C49.2004 22.3075 50.6158 23.7229 52.3619 23.7229L58.8657 23.7229C60.6117 23.7229 62.0272 22.3075 62.0272 20.5614C62.0272 18.8154 60.6117 17.3999 58.8657 17.3999L52.3619 17.3999ZM51.6004 20.5614C51.6004 20.1408 51.9413 19.7999 52.3619 19.7999L58.8657 19.7999C59.2862 19.7999 59.6272 20.1408 59.6272 20.5614C59.6272 20.982 59.2862 21.3229 58.8657 21.3229L52.3619 21.3229C51.9413 21.3229 51.6004 20.982 51.6004 20.5614Z" fill="hsl(var(--muted-foreground))" />
      </svg>
    )
  }

  if (type === 'mediaFolders') {
    return (
      <svg className="opacity-70" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.8446 44.1775C26.8446 40.8638 29.5309 38.1775 32.8446 38.1775H78.8446C82.1583 38.1775 84.8446 40.8638 84.8446 44.1775V47.1998H35.6002C33.612 47.1998 32.0002 48.8115 32.0002 50.7998V93.0002H26.8446V44.1775Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M64.8666 20.5605C66.1325 21.763 66.184 23.7641 64.9814 25.03C63.7789 26.296 61.7778 26.3474 60.5119 25.1449L55.7964 20.6656C54.5304 19.4631 54.479 17.462 55.6816 16.1961C56.8841 14.9301 58.8852 14.8787 60.1511 16.0812L64.8666 20.5605ZM63.2413 23.3771C63.531 23.0722 63.5186 22.5902 63.2137 22.3006L58.4982 17.8213C58.1933 17.5317 57.7113 17.544 57.4216 17.849C57.132 18.1539 57.1444 18.6359 57.4493 18.9255L62.1648 23.4048C62.4697 23.6944 62.9517 23.6821 63.2413 23.3771Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M70.3462 22.9087C68.6002 22.9311 67.2031 24.3646 67.2254 26.1105C67.2478 27.8564 68.6813 29.2536 70.4272 29.2312L76.9304 29.1479C78.6763 29.1255 80.0735 27.692 80.0512 25.9461C80.0288 24.2002 78.5953 22.803 76.8494 22.8254L70.3462 22.9087ZM69.6252 26.0797C69.6198 25.6592 69.9564 25.3139 70.3769 25.3085L76.8802 25.2252C77.3007 25.2198 77.646 25.5563 77.6514 25.9769C77.6568 26.3974 77.3202 26.7427 76.8997 26.7481L70.3964 26.8314C69.9759 26.8368 69.6306 26.5003 69.6252 26.0797Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M90.9727 40.5212V45.7926H91.8224C96.4616 45.7926 100.222 49.5534 100.222 54.1926V86.3998C100.222 91.0389 96.4616 94.7998 91.8224 94.7998H80.3547C80.3849 94.4037 80.4002 94.0035 80.4002 93.5998C80.4002 93.196 80.3849 92.7958 80.3547 92.3998H91.8224C95.1361 92.3998 97.8224 89.7135 97.8224 86.3998V54.1926C97.8224 50.8789 95.1361 48.1926 91.8224 48.1926H38.5199C35.2062 48.1926 32.5199 50.8789 32.5199 54.1926V92.3998H49.2457C49.2155 92.7958 49.2002 93.196 49.2002 93.5998C49.2002 94.0035 49.2155 94.4037 49.2457 94.7998H27.6002C22.961 94.7998 19.2002 91.039 19.2002 86.3998V31.1998C19.2002 26.5606 22.961 22.7998 27.6002 22.7998H49.7157C51.9958 22.7998 54.178 23.7267 55.7611 25.3676L60.507 30.287C61.6378 31.4591 63.1964 32.1212 64.8251 32.1212H82.5727C87.2119 32.1212 90.9727 35.882 90.9727 40.5212ZM21.6002 31.1998C21.6002 27.8861 24.2865 25.1998 27.6002 25.1998H49.7157C51.3444 25.1998 52.9031 25.8618 54.0338 27.0339L58.7798 31.9533C60.3629 33.5943 62.545 34.5212 64.8251 34.5212H82.5727C85.8865 34.5212 88.5727 37.2075 88.5727 40.5212V45.7926H38.5199C33.8808 45.7926 30.1199 49.5534 30.1199 54.1926V92.3998H27.6002C24.2865 92.3998 21.6002 89.7135 21.6002 86.3998V31.1998Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M64.8002 79.1998C56.8473 79.1998 50.4002 85.6469 50.4002 93.5998C50.4002 101.553 56.8473 108 64.8002 108C72.7531 108 79.2002 101.553 79.2002 93.5998C79.2002 85.6469 72.7531 79.1998 64.8002 79.1998ZM48.0002 93.5998C48.0002 84.3214 55.5218 76.7998 64.8002 76.7998C74.0786 76.7998 81.6002 84.3214 81.6002 93.5998C81.6002 102.878 74.0786 110.4 64.8002 110.4C55.5218 110.4 48.0002 102.878 48.0002 93.5998Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M61.8002 85.7996C61.8002 84.1428 63.1433 82.7996 64.8002 82.7996C66.457 82.7996 67.8002 84.1428 67.8002 85.7996V92.9996C67.8002 94.6565 66.457 95.9996 64.8002 95.9996C63.1433 95.9996 61.8002 94.6565 61.8002 92.9996V85.7996ZM64.8002 85.1996C64.4688 85.1996 64.2002 85.4683 64.2002 85.7996V92.9996C64.2002 93.331 64.4688 93.5996 64.8002 93.5996C65.1316 93.5996 65.4002 93.331 65.4002 92.9996V85.7996C65.4002 85.4683 65.1316 85.1996 64.8002 85.1996Z" fill="hsl(var(--muted-foreground))" />
        <path fillRule="evenodd" clipRule="evenodd" d="M61.8002 101.4C61.8002 103.056 63.1433 104.4 64.8002 104.4C66.457 104.4 67.8002 103.056 67.8002 101.4C67.8002 99.7428 66.457 98.3996 64.8002 98.3996C63.1433 98.3996 61.8002 99.7428 61.8002 101.4ZM64.8002 102C64.4688 102 64.2002 101.731 64.2002 101.4C64.2002 101.068 64.4688 100.8 64.8002 100.8C65.1316 100.8 65.4002 101.068 65.4002 101.4C65.4002 101.731 65.1316 102 64.8002 102Z" fill="hsl(var(--muted-foreground))" />
      </svg>
    )
  }
}