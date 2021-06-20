'use strict';

$(() => {
  // マスターテーブル
  let baseUrl = './assets/data/';
  let area = 'area';
  let areaName = 'areaName';
  // let center = 'center';
  // let centerName = 'centerName';
  // let classification = 'classification';
  let classificationName = 'classificationName';
  let garbage = 'garbage';
  let garbageName = 'garbageName';
  // let routine = 'routine';
  let routineDetail = 'routineDetail';
  // let routineClassification = 'routineClassification';
  let routineClassificationName = 'routineClassificationName';
  // let label = 'label';
  let labelString = 'labelString';
  let notification = 'notification';
  let notificationString = 'notificationString';
  let language = 'language';

  // 言語
  let lang = 0;
  // エリア設定
  let areaId1 = -1;
  let areaDivision = 0;
  let areaId2 = -1;
  let routineId = 99;
  // 他定数
  const today = new Date();
  // 他グローバル変数
  let toDayYear = today.getFullYear();
  let valYear = toDayYear;
  let toDayMonth = today.getMonth();
  let valMonth = toDayMonth;
  let todayDay = today.getDate();
  let limitYearMin = toDayMonth < 8 ? toDayYear - 1 : toDayYear;
  let limitYearMax = toDayMonth < 8 ? toDayYear : toDayYear + 1;
  let monthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let weekList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  // localStrageデータ呼び出し
  function loadLocalStrage() {
    let langFlag = localStorage.getItem('lang_5374.jp-sakaiminato');
    let areaId1Flag = localStorage.getItem('areaId1_5374.jp-sakaiminato');
    let areaId2Flag = localStorage.getItem('areaId2_5374.jp-sakaiminato');

    if (langFlag === null) {
      let language = (window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage).substr(0, 2);
      if (language === 'en') {
        lang = 1;
      }
      areaId1 = -1;
      areaId2 = -1;
      localStorage.setItem('lang_5374.jp-sakaiminato', -1);
      localStorage.setItem('areaId1_5374.jp-sakaiminato', areaId1);
      localStorage.setItem('areaId2_5374.jp-sakaiminato', areaId2);
      createSelectboxAreaId1();
      if (navigator.userAgent.indexOf('msie') != -1 || navigator.userAgent.indexOf('trident') != -1) {

      } else {
        let speed = 500;
        let position = $('.setting-area').offset().top;
        $('.warning-message').hide();
        $('html, body').animate({ scrollTop: position }, speed, 'swing');
      }
    } else {
      if (navigator.userAgent.indexOf('msie') != -1 || navigator.userAgent.indexOf('trident') != -1) {
      } else {
        $('.warning-message').hide();
      }
      if (langFlag === null) {
        lang = 0;
      } else {
        lang = parseInt(langFlag);
      }
      createSelectboxAreaId1();
      if (areaId1Flag === null) {
        areaId1 = -1;
      } else {
        areaId1 = parseInt(areaId1Flag);
        if (areaId2Flag === null) {
          areaId2 = -1;
        } else {
          areaId2 = parseInt(areaId2Flag);
        }
        createSelectboxAreaId2();
      }
    }
  }

  function createSelectboxLang() {
    let langBox = $('#lang');
    let langTable = [];
    $.when(
      $.getJSON(baseUrl + language + '.json')
    ).done((data_a) => {
      langTable = data_a;
      langBox.append('<option value="-1">言語/Language</option>');
      langTable.forEach((langRecord) => {
        langBox.append('<option value="' + langRecord['id'] + '">' + langRecord['languageName'] + '</option>');
      });
      langBox.val(lang);
    });
  }

  function createSelectboxAreaId1() {
    let areaId1Box = $('#area-id1');
    let areaId2Box = $('#area-id2');
    let areaTable = [];
    let areaNameTable = [];

    let labels = [];

    areaId1Box.empty();
    areaId2Box.empty();

    $.when(
      $.getJSON(baseUrl + labelString + '.json')
    ).done((data_a) => {
      let labelTable = data_a;

      labelTable.forEach((labelRecord) => {
        if (labelRecord['languageId'] === lang) {
          labels.push(labelRecord['label']);
        }
      });
      $.when(
        $.getJSON(baseUrl + area + '.json'),
        $.getJSON(baseUrl + areaName + '.json')
      ).done((data_a, data_b) => {
        areaTable = data_a[0];
        areaNameTable = data_b[0];

        areaTable.sort((a, b) => {
          if (a.sort < b.sort) return -1;
          if (a.sort > b.sort) return 1;
          return 0;
        });

        areaId1Box.append('<option value="-1">' + labels[44] + '</option>');
        areaTable.forEach((areaRecord) => {
          if (areaRecord['areaDivision'] === 0 || areaRecord['areaDivision'] === 1) {
            let areaString = '<option value="';
            areaString += areaRecord['id'];
            areaString += '">';
            areaNameTable.forEach((areaNameRecord) => {
              if (areaNameRecord['areaId'] === areaRecord['id']) {
                if (areaNameRecord['languageId'] === lang) {
                  areaString += areaNameRecord['areaName'];
                  return true;
                }
              }
            });
            areaString += '</option>';
            areaId1Box.append(areaString);
          }
        });
        if (areaId1 !== -1) {
          areaId1Box.val(areaId1);
        } else {
          areaId2Box.hide();
          $('.area-inquiry').hide();
        }
      });
    });
  }

  function createSelectboxAreaId2() {
    let areaId2Box = $('#area-id2');
    let areaTable = [];
    let areaNameTable = [];

    let labels = [];

    areaId2Box.empty();

    $.when(
      $.getJSON(baseUrl + labelString + '.json')
    ).done((data_a) => {
      let labelTable = data_a;

      labelTable.forEach((labelRecord) => {
        if (labelRecord['languageId'] === lang) {
          labels.push(labelRecord['label']);
        }
      });
      if (areaId1 !== -1) {
        $.when(
          $.getJSON(baseUrl + area + '.json'),
          $.getJSON(baseUrl + areaName + '.json')
        ).done((data_a, data_b) => {
          areaTable = data_a[0];
          areaNameTable = data_b[0];
          areaDivision = 1;
          areaId2Box.append('<option value="-1">' + labels[45] + '</option>');
          areaTable.forEach((areaRecord) => {
            if (areaRecord['id'] === areaId1 && areaRecord['areaDivision'] === 0) {
              areaDivision = 0;
            }
            if (areaRecord['areaDivision'] === 2) {
              if ((areaId1 + 1) === areaRecord['id'] || (areaId1 + 2) === areaRecord['id']) {
                let areaString = '<option value="';
                areaString += areaRecord['id'];
                areaString += '">';
                areaNameTable.forEach((areaNameRecord) => {
                  if (areaNameRecord['areaId'] === areaRecord['id']) {
                    if (areaNameRecord['languageId'] === lang) {
                      areaString += areaNameRecord['areaName'];
                      return true;
                    }
                  }
                });
                areaString += '</option>';
                areaId2Box.append(areaString);
              }
            }
          });
          if (areaDivision === 0) {
            areaId2Box.empty();
            areaId2 = -1;
            localStorage.setItem('areaId2_5374.jp-sakaiminato', areaId2);
            areaId2Box.hide();
            $('.area-inquiry').hide();
          } else {
            areaId2Box.show();
            $('.area-inquiry').show();
          }
          if (areaId2 !== -1) {
            areaId2Box.val(areaId2);
          }
          drawingCalendar();
        });
      }
    });
  }

  function drawingCalendar() {
    const isLeapYear = (y) => {
      return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
    };
    const calendarArea = $('.calendar');
    let i = 0, j = 0;
    let toYear = toDayMonth < 8 ? toDayYear : toDayYear + 1;
    let firstDay = new Date(valYear, valMonth, 1);
    let firstWeek = firstDay.getDay();
    let todayWeek = today.getDay();
    let valWeek = firstWeek;
    let thisArea = areaId2 === -1 ? areaId1 : areaId2;
    let dateCount = 0;
    let tableString = '';
    let noticeString = '';
    let loopCount = 0;

    let labels = [];
    let cacheWeekArray = [];
    let cacheDayArray = [];
    let cacheRustArray = [];
    let cacheTodayRout = 0;
    let weekCount = [0, 0, 0, 0, 0, 0, 0];

    let calendar = [
      [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
      ],
      [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
      ],
      [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
      ],
      [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
      ],
      [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
      ],
      [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
      ],
    ];
    let todayRout = [];
    let todayRoutDetail = [];

    monthList[1] = isLeapYear(firstDay.getFullYear()) ? 29 : 28;


    calendarArea.empty();

    $.when(
      $.getJSON(baseUrl + labelString + '.json')
    ).done((data_a) => {
      let labelTable = data_a;

      labelTable.forEach((labelRecord) => {
        if (labelRecord['languageId'] === lang) {
          labels.push(labelRecord['label']);
        }
      });
      if (((areaDivision !== 0) && (areaId2 !== -1)) || (areaDivision === 0)) {
        $.when(
          $.getJSON(baseUrl + routineDetail + '.json'),
          $.getJSON(baseUrl + routineClassificationName + '.json'),
          $.getJSON(baseUrl + area + '.json')
        ).done((data_a, data_b, data_c) => {
          let routineDetailTable = data_a[0];
          let routineClassificationNameTable = data_b[0];
          let areaTable = data_c[0];
          let langRoutineClassificationName = [];
          let weekRowCount = 0;

          areaTable.forEach((areaRecode) => {
            if (areaRecode['id'] === thisArea) {
              routineId = areaRecode['routineId'];
            }
          });
          routineClassificationNameTable.forEach((routineClassificationNameRecord) => {
            if (routineClassificationNameRecord['languageId'] === lang) {
              langRoutineClassificationName.push(routineClassificationNameRecord['routineClassificationName']);
            }
          });

          routineDetailTable.forEach((routineDetailRecord) => {
            weekRowCount = 0;
            dateCount = 0;
            valWeek = firstWeek;
            weekCount = [0, 0, 0, 0, 0, 0, 0];
            if (routineDetailRecord['routineId'] === routineId) {
              if (routineDetailRecord['year'] === toYear) {
                if (routineDetailRecord['month' + (valMonth + 1)] === 1) {
                  while (dateCount < monthList[valMonth]) {
                    weekCount[valWeek]++;
                    if (routineDetailRecord['week'+ weekCount[valWeek]] === 1) {
                      if (routineDetailRecord['day'+ weekList[valWeek]] === 1) {
                        calendar[routineDetailRecord['routineClassificationId']][weekRowCount][valWeek] = '<span class="rout cat' + routineDetailRecord['routineClassificationId'] + '">' + langRoutineClassificationName[routineDetailRecord['routineClassificationId']] + '</span>';
                      }
                    }

                    if (routineDetailRecord['week'+ weekCount[valWeek]] === 2) {
                      if (routineDetailRecord['day'+ weekList[valWeek]] === 2) {
                        calendar[routineDetailRecord['routineClassificationId']][weekRowCount][valWeek] = '';
                      }
                    }

                    valWeek++;
                    if (valWeek === 7) {
                      valWeek = 0;
                      weekRowCount++;
                    }
                    dateCount++;
                  }
                }
              }
            }
          });

          todayRout = [];
          todayRoutDetail = [];
          routineDetailTable.forEach((routineDetailRecord) => {
            dateCount = 0;
            cacheTodayRout = 99;
            cacheRustArray = [];
            cacheWeekArray = [];
            cacheDayArray = [];
            valWeek = firstWeek;
            weekCount = [0, 0, 0, 0, 0, 0, 0];
            if (routineDetailRecord['routineId'] === routineId) {
              if (routineDetailRecord['irregularFlag'] === 0) {
                if (routineDetailRecord['year'] === toYear) {
                  if (routineDetailRecord['month' + (toDayMonth + 1)] === 1) {
                    while (dateCount < monthList[toDayMonth]) {
                      weekCount[valWeek]++;
                      if (routineDetailRecord['week'+ weekCount[valWeek]] === 1) {
                        if (routineDetailRecord['day'+ weekList[todayWeek]] === 1) {
                          if (todayDay === dateCount) {
                            cacheTodayRout = routineDetailRecord['routineClassificationId'];
                          }
                          cacheWeekArray.push(weekCount[valWeek]);
                          cacheDayArray.push(todayWeek);
                        }
                      }
                      valWeek++;
                      if (valWeek === 7) {
                        valWeek = 0;
                      }
                      dateCount++;
                    }
                    if (cacheTodayRout !== 99) {
                      todayRout.push(cacheTodayRout);
                      if(cacheWeekArray.length > 0) {
                        cacheRustArray.push(Array.from(new Set(cacheWeekArray)));
                      }
                      if (cacheDayArray.length > 0) {
                        cacheRustArray.push(Array.from(new Set(cacheDayArray)));
                      }
                      if (cacheRustArray.length > 0) {
                        todayRoutDetail.push(cacheRustArray);
                      }
                    }
                  }
                }
              }
            }
          });

          tableString += '<table class="calendar-table"><caption><span id="prev_month" class="material-icons">arrow_left</span>' + valYear + labels[16] + (valMonth + 1) + labels[17] + '<span id="next_month" class="material-icons">arrow_right</span></caption><tbody>';
          tableString += '<tr><td><br>' + labels[18] + '</td><td><br>' + labels[19] + '</td><td><br>' + labels[20] + '</td><td><br>' + labels[21] + '</td><td><br>' + labels[22] + '</td><td><br>' + labels[23] + '</td><td><br>' + labels[24] + '</td></tr>'
          dateCount = 1;
          for (i = 0; i <= 5; i++) {
            tableString += '<tr>';
            for (j = 0; j <= 6; j++) {
              tableString += '<td>';
              if ((i === 0) && (j < firstWeek)) {
                continue;
              }
              if (dateCount <= monthList[valMonth]) {
                tableString += '<span class="day">' + dateCount + '</span>';
                calendar.forEach((calendarCat) => {
                  if (calendarCat[i][j] !== '') {
                    tableString += calendarCat[i][j];
                  }
                });
                dateCount++;
              }
              tableString += '</td>';
            }
            tableString += '</tr>';
          }
          tableString += '</tbody></table>';
          noticeString += '';
          if (todayRout.length > 0) {
            noticeString += '<div class="todayNotice"><h2>' + labels[25] + '</h2>';
          }
          loopCount = 0;
          todayRout = Array.from(new Set(todayRout));
          todayRout.forEach((routineClassificationId) => {
            let weekString = '';
            let innerLoopCount = 0;
            let loopAddCount = 0;
            let dateLang = [labels[18], labels[19], labels[20], labels[21], labels[22], labels[23], labels[24]];
            noticeString += '<h3>' + langRoutineClassificationName[routineClassificationId] + '</h3>';
            cacheRustArray = [];
            cacheRustArray = todayRoutDetail[loopCount];
            if (routineClassificationId === 3) {
              weekString += labels[26];
            } else {
              weekString += labels[27];
            }
            cacheRustArray.forEach((cacheArray) => {
              if(innerLoopCount === 0) {
                if (cacheArray.length >= 5) {
                  weekString = labels[28];
                } else {
                  loopAddCount = 0;
                  cacheArray.forEach((week)=> {
                    if (loopAddCount > 0) {
                      weekString += ',';
                    }
                    weekString += week;
                    loopAddCount++;
                  });
                }
              }
              if (innerLoopCount === 1) {
                loopAddCount = 0;
                cacheArray.forEach((day) => {
                  if (loopAddCount > 0) {
                    weekString += ',';
                  }
                  weekString += dateLang[day];
                  loopAddCount++;
                });
              }
              innerLoopCount++;
            });
            weekString += labels[29];
            noticeString += '<p>' + weekString + ' ' + toDayYear + '/' + (toDayMonth + 1) + '/' + todayDay + '</p>';
            loopCount++;
          });
          if (todayRout.length > 0) {
            noticeString += '</div>';
          }
          calendarArea.append(noticeString);
          calendarArea.append(tableString);
          if ((valYear === limitYearMin) && (valMonth === 8)) {
            $('#prev_month').addClass('button_disabled');
          } else {
            $('#prev_month').removeClass('button_disabled');
            $('#prev_month').on('click', function() {
              if(valMonth > 0) {
                if (
                  (valYear > limitYearMin && valMonth < 8) ||
                  (valYear === limitYearMin && valMonth > 8)
                ) {
                  valMonth--;
                }
              } else {
                valMonth = 11;
                valYear--;
              }
              drawingCalendar();
            });
          }
          if ((valYear === limitYearMax) && (valMonth === 7)) {
            $('#next_month').addClass('button_disabled');
          } else {
            $('#next_month').removeClass('button_disabled');
            $('#next_month').on('click', function() {
              if(valMonth < 11) {
                if (
                  (valYear < limitYearMax && valMonth > 7) ||
                  (valYear === limitYearMax && valMonth < 7)
                ) {
                  valMonth++;
                }
              } else {
                valMonth = 0;
                valYear++;
              }
              drawingCalendar();
            });
          }
        });
      }
    });
  }

  function loadNotification() {
    let notificationsArea = $('.notifications');
    let notificationContent = '';
    let notificationCount = 0;

    let now = (today.getFullYear() * 10000) + ((today.getMonth() + 1) * 100) + today.getDate();

    let labels = [];

    notificationsArea.empty();

    $.when(
      $.getJSON(baseUrl + labelString + '.json')
    ).done((data_a) => {
      let labelTable = data_a;

      labelTable.forEach((labelRecord) => {
        if (labelRecord['languageId'] === lang) {
          labels.push(labelRecord['label']);
        }
      });

      $.when(
        $.getJSON(baseUrl + notification + '.json'),
        $.getJSON(baseUrl + notificationString + '.json')
      ).done((data_a, data_b) => {
        let notificationTable = data_a[0];
        let notificationStringTable = data_b[0];

        notificationTable.sort((a, b) => {
          if (a.date > b.date) return -1;
          if (a.date < b.date) return 1;
          return 0;
        });

        notificationContent += '<h2>' + labels[30] + '</h2>';
        notificationCount = 0;

        notificationTable.forEach((notificationRecord) => {
          let cautionFlag = notificationRecord['cautionFlag'];
          let notificationId = notificationRecord['id'];

          if ((notificationRecord['beginDate'] <= now) && (notificationRecord['endDate'] >= now) && (0 === notificationRecord['cautionFlag'])) {
            notificationStringTable.forEach((notificationStringRecord) => {
              if ((lang === notificationStringRecord['languageId']) && (notificationId === notificationStringRecord['notificationId'])) {
                notificationContent += '<div class="notification"><div class="notification-head"><time datetime="' + (notificationRecord['date'] + '').slice(0, 4) + '-' + (notificationRecord['date'] + '').slice(4, 6) + '-' + (notificationRecord['date'] + '').slice(6, 8) + '">' + (notificationRecord['date'] + '').slice(0, 4) + labels[13] + (parseInt((notificationRecord['date'] + '').slice(4, 6)) + '') + labels[14] + (parseInt((notificationRecord['date'] + '').slice(6, 8)) + '') + labels[15] + '</time>';
                notificationContent += '<h3>' + notificationStringRecord['title'] + '</h3></div>';
                notificationContent += '<div class="notification-body"><p>' + notificationStringRecord['notification'] + '</p></div></div>';
                notificationCount++;
              }
            });
          }
        });

        if (notificationCount === 0) {
          notificationContent += '<div class="notification"><p>' + labels[52] + '</p></div>';
        }

        notificationsArea.append(notificationContent);
        $('.notification-head').on('click', function () {
          $(this).next('.notification-body').slideToggle();
        });
        $('.notification-body').slideToggle();
      });
    });
  }

  function loadWarning() {
    let warningsArea = $('.warnings');
    let warningContent = '';
    let warningCount = 0;

    let today = new Date();

    let now = (today.getFullYear() * 10000) + ((today.getMonth() + 1) * 100) + today.getDate();

    let labels = [];

    warningsArea.empty();

    $.when(
      $.getJSON(baseUrl + labelString + '.json')
    ).done((data_a) => {
      let labelTable = data_a;

      labelTable.forEach((labelRecord) => {
        if (labelRecord['languageId'] === lang) {
          labels.push(labelRecord['label']);
        }
      });

      $.when(
        $.getJSON(baseUrl + notification + '.json'),
        $.getJSON(baseUrl + notificationString + '.json')
      ).done((data_a, data_b) => {
        let notificationTable = data_a[0];
        let notificationStringTable = data_b[0];

        notificationTable.sort((a, b) => {
          if (a.date > b.date) return -1;
          if (a.date < b.date) return 1;
          return 0;
        });

        warningContent += '<h2>' + labels[12] + '</h2>';

        notificationTable.forEach((notificationRecord) => {
          let cautionFlag = notificationRecord['cautionFlag'];
          let notificationId = notificationRecord['id'];

          if ((notificationRecord['beginDate'] <= now) && (notificationRecord['endDate'] >= now) && (1 === notificationRecord['cautionFlag'])) {
            notificationStringTable.forEach((notificationStringRecord) => {
              if ((lang === notificationStringRecord['languageId']) && (notificationId === notificationStringRecord['notificationId'])) {
                warningContent += '<div class="warning"><div class="warning-head"><time datetime="' + (notificationRecord['date'] + '').slice(0, 4) + '-' + (notificationRecord['date'] + '').slice(4, 6) + '-' + (notificationRecord['date'] + '').slice(6, 8) + '">' + (notificationRecord['date'] + '').slice(0, 4) + labels[13] + (parseInt((notificationRecord['date'] + '').slice(4, 6)) + '') + labels[14] + (parseInt((notificationRecord['date'] + '').slice(6, 8)) + '') + labels[15] + '</time>';
                warningContent += '<h3>' + notificationStringRecord['title'] + '</h3></div>';
                warningContent += '<div class="warning-body"><p>' + notificationStringRecord['notification'] + '</p></div></div>';
                warningCount++;
              }
            });
          }
        });
        if (warningCount === 0) {
          warningsArea.hide();
        } else {
          warningsArea.show();
          warningsArea.append(warningContent);
          $('.warning-head').on('click', function () {
            $(this).next('.warning-body').slideToggle();
          });
          $('.warning-body').slideToggle();
        }
      });
    });
  }

  // function getCenterData() {
  //   let centerArea = $('.recycle-station .accordion');
  //   let centerCount = 0;
  //   let labels = [];
  //
  //   centerArea.empty();
  //
  //   $.when(
  //     $.getJSON(baseUrl + labelString + '.json')
  //   ).done( (data_a) => {
  //     let labelTable = data_a;
  //
  //     labelTable.forEach( (labelRecord) => {
  //       if (labelRecord['languageId'] === lang) {
  //         labels.push(labelRecord['label']);
  //       }
  //     });
  //
  //     $.when(
  //       $.getJSON(baseUrl + center + '.json'),
  //       $.getJSON(baseUrl + centerName + '.json')
  //     ).done( (data_a, data_b) => {
  //       let centerTable = data_a[0];
  //       let centerNameTable = data_b[0];
  //
  //       centerTable.forEach( (centerRecord) => {
  //         centerNameTable.forEach( (centerNameRecord) => {
  //           if (centerNameRecord['languageId'] === lang) {
  //             if (centerCount > 0) {
  //               centerArea.append('<hr>')
  //             }
  //             centerArea.append('<h3>' + centerNameRecord['centerName'] + '</h3>');
  //             centerArea.append('<img src="./assets/images/' + centerRecord['image'] + '" alt="">');
  //             centerArea.append('<address><p>'+ centerNameRecord['address'] +'</p><p><i class="fas fa-phone-volume"></i>' + centerRecord['phoneNum'] + '</p></address>');
  //             centerCount++;
  //           }
  //         });
  //       });
  //     });
  //   });
  // }

  function drawingLabels() {
    let labels = [];

    $.when(
      $.getJSON(baseUrl + labelString + '.json')
    ).done((data_a) => {
      let labelTable = data_a;

      labelTable.forEach((labelRecord) => {
        if (labelRecord['languageId'] === lang) {
          labels.push(labelRecord['label']);
        }
      });

      $('.l0').empty().append(labels[0]);
      $('.l1').empty().append(labels[1]);
      $('.l4').empty().append(labels[4]);
      $('.l5').empty().append(labels[5]);
      $('.l6').empty().append(labels[6]);
      $('.l7').empty().append(labels[7]);
      $('.l8').empty().append(labels[8]);
      $('.l9').empty().append(labels[9]);
      $('.l10').empty().append(labels[10]);
      $('.l11').empty().append(labels[11]);
      $('.l31').empty().append(labels[31]);
      $('.l32').empty().append(labels[32]);
      $('.l33').empty().append(labels[33]);
      $('.l34').empty().append(labels[34]);
      $('.l35').empty().append(labels[35]);
      $('.l36').empty().append(labels[36]);
      $('.l37').empty().append(labels[37]);
      $('.l38').empty().append(labels[38]);
      $('.l39').empty().append(labels[39]);
      $('.l40').empty().append(labels[40]);
      $('.l41').empty().append(labels[41]);
      $('.l42').empty().append(labels[42]);
      $('.l43').empty().append(labels[43]);
      $('.l47').empty().append(labels[47]);
      $('.l48').empty().append(labels[48]);
      $('.l49').empty().append(labels[49]);
      $('.l50').empty().append(labels[50]);
      $('.l51').empty().append(labels[51]);
      $('.l53').empty().append(labels[53]);
    });
  }

  loadLocalStrage();
  createSelectboxLang();
  loadWarning();
  loadNotification();
  // getCenterData();
  drawingLabels();

  $('.accordion').slideToggle();

  $('.navi-button').on('click', (e) => {
    $('.global-navi').slideToggle();
  });

  $('a[href^="#"]').on('click', function () {

    $('.global-navi').slideToggle();

    var speed = 500;
    var href = $(this).attr("href");
    if (href !== '#apps-about') {
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $("html, body").animate({ scrollTop: position }, speed, "swing");

      if (href === '#transfer') {
        $('#transfer .accordion').slideToggle();
      }
      if (href === '#recycle-station') {
        $('#recycle-station .accordion').slideToggle();
      }
      if (href === '#oversize-garbage') {
        $('#oversize-garbage .accordion').slideToggle();
      }
      if (href === '#bring-in') {
        $('#bring-in .accordion').slideToggle();
      }
      if (href === '#not-handle') {
        $('#not-handle .accordion').slideToggle();
      }
      if (href === '#inquiry') {
        $('#inquiry .accordion').slideToggle();
      }
    } else {
      $('.about-app').css('left', '0');
    }
    return false;
  });

  $('.about-app .close').on('click', function () {
    $('.about-app').css('left', '100%');
  });

  $('#transfer h2, #recycle-station h2, #oversize-garbage h2, #bring-in h2, #not-handle h2, #inquiry h2').on('click', function () {
    $(this).next('.accordion').slideToggle();
  });

  $('#gototop').on('click', function () {
    $("html,body").animate({ scrollTop: 0 }, "300");
  });

  $('#lang').change((e) => {
    lang = parseInt($('#lang').val());
    if (lang === -1) {
      lang = 0;
    }
    localStorage.setItem('lang_5374.jp-sakaiminato', lang);

    loadWarning();
    loadNotification();
    // getCenterData();
    drawingLabels();
    createSelectboxAreaId1();
    if ((areaId1 !== -1) || (areaId2 !== -1)) {
      createSelectboxAreaId2();
    }
  });

  $('#area-id1').change((e) => {
    areaId1 = parseInt($('#area-id1').val());
    localStorage.setItem('areaId1_5374.jp-sakaiminato', areaId1);
    areaId2 = -1;
    createSelectboxAreaId2();
  });

  $('#area-id2').change((e) => {
    areaId2 = parseInt($('#area-id2').val());
    localStorage.setItem('areaId2_5374.jp-sakaiminato', areaId2);
    drawingCalendar();
  });

  $('#search-text').change((e) => {
    let searchBox = $('#search-text').val();
    let searchResult = $('.search-result');

    let labels = [];

    searchResult.empty();

    if (searchBox !== '') {
      $.when(
        $.getJSON(baseUrl + labelString + '.json')
      ).done((data_a) => {
        let labelTable = data_a;

        labelTable.forEach((labelRecord) => {
          if (labelRecord['languageId'] === lang) {
            labels.push(labelRecord['label']);
          }
        });

        $.when(
          $.getJSON(baseUrl + garbage + '.json'),
          $.getJSON(baseUrl + garbageName + '.json'),
          $.getJSON(baseUrl + classificationName + '.json')
        ).done((data_a, data_b, data_c) => {
          let garbageTable = data_a[0];
          let garbageNameTable = data_b[0];
          let classificationNameTable = data_c[0];

          let classificationNameLang = {};

          let resultTable = [];

          classificationNameTable.forEach((classificationNameRecord) => {
            if (classificationNameRecord['languageId'] === lang) {
              classificationNameLang[classificationNameRecord['classificationId']] = classificationNameRecord['classificationName'];
            }
          });
          garbageTable.forEach((garbageRecord) => {
            garbageNameTable.forEach((garbageNameRecord) => {
              if ((garbageNameRecord['garbageId'] === garbageRecord['id']) && (garbageNameRecord['languageId'] === lang) && garbageNameRecord['searchWord'].includes(searchBox)) {
                resultTable.push({ 'classification': classificationNameLang[garbageRecord['classificationId']], 'Name': garbageNameRecord['garbageName'], 'notice': garbageNameRecord['notice'] === '' ? labels[46] : garbageNameRecord['notice'] });
              }
            });
          });
          searchResult.append('<div class="result-count">' + labels[2] + resultTable.length + labels[3] + '</div>');
          if (resultTable.length > 0) {
            resultTable.forEach((result) => {
              searchResult.append('<div class="result-ele close"><p class="classification">' + result['classification'] + '</p><p class="garbage">' + result['Name'] + '</p><p class="garbage-notice">' + result['notice'] + '</p></div>');
            });
          }
          $('.result-ele').on('click', function () {
            if ($(this).hasClass('close')) {
              $(this).removeClass('close');
            } else {
              $(this).addClass('close');
            }
          });
        });
      });
    }
  });
});
