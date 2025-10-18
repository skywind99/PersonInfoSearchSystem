// 아래 따옴표 내부의 스프레트시트 URL만 정확하게 변경하세요.
const ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1tg6FyQ8rKjS63xur6lncTT1bpGDei0CLadcrtZ2nSTo/edit?gid=0#gid=0");

// 만약 스프레드 시트탭의 이름이 "시트1"이 아니라면, 수정해 주세요.
const ws = ss.getSheetByName("시트1");

// 아래부터의 내용은 아무것도 건드리지 마세요.
let data;

function doGet() {
  var tmp = HtmlService.createHtmlOutputFromFile('index.html');
  tmp.setTitle('고등학교 기숙사배정');
  tmp.setSandboxMode(HtmlService.SandboxMode.IFRAME);
  tmp.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return tmp;
} 


function verifyPassword(inputPassword) {
    var correctPassword = '1234';
    var redirectUrl = 'https://docs.google.com/spreadsheets/d/1tg6FyQ8rKjS63xur6lncTT1bpGDei0CLadcrtZ2nSTo/edit?gid=0#gid=0'; // 원하는 리다이렉트 URL로 변경하세요

    if (inputPassword === correctPassword) {
        return {
            status: 'success',
            url: redirectUrl
        };
    } else {
        return {
            status: 'failure',
            url: null
        };
    }
}

function doSearchResult(yourBirth, yourName) {
  data = ws.getRange(2, 1, ws.getLastRow()-1, 3).getValues();

  let filtered = data.filter(function(r){
    return r[0] == yourBirth && r[1] == yourName;
  })
  //console.log(filtered);
  if(filtered.length == 1) return filtered[0][1] + " 학생 " + filtered[0][2] + "입니다";
  else return "검색 결과가 없습니다. 정확하게 입력했는지 확인 바랍니다.";
}
