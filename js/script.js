'use strict';

$( () => {
  // マスターテーブル
  let baseUrl = './data/';
  let area = 'area';
  let areaName = 'areaName';
  let center = 'center';
  let centerName = 'centerName';
  let classification = 'classification';
  let classificationName = 'classificationName';
  let garbage = 'garbage';
  let garbageName = 'garbageName';
  let routine = 'routine';
  let routineClassification = 'routineClassification';
  let routineClassificationName = 'routineClassificationName';
  let label = 'label';
  let labelString = 'labelString';
  let notification = 'notification';
  let notificationString = 'notificationString';
  let language = 'language';

  // 初回起動フラグ
  let initFlag = -1;

  // 言語
  let lang = -1;
  // エリア設定
  let areaId1 = -1;
  let areaDivision = 0;
  let areaId2 = -1;

  // Cookie寿命：1年 31536000秒
  const cookieLifespan = 31536000;

  // Cookieデータ呼び出し
  function loadCookie () {
    let langFlag = document.cookie.indexOf('lang_5374.jp-sakaiminato');
    let areaId1Flag = document.cookie.indexOf('areaId1_5374.jp-sakaiminato');
    let areaId2Flag = document.cookie.indexOf('areaId2_5374.jp-sakaiminato');
    let cookies = document.cookie.split(';');
    let cookieList = {};

    if (langFlag === -1) {
      let language = (window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage).substr(0,2);
      if (language === 'ja') {
        lang = 0;
      } else {
        lang = 1;
      }
      areaId1 = -1;
      areaId2 = -1;
      document.cookie = 'lang_5374.jp-sakaiminato=-1; max-age=' + cookieLifespan;
      document.cookie = 'areaId1_5374.jp-sakaiminato=-1; max-age=' + cookieLifespan;
      document.cookie = 'areaId2_5374.jp-sakaiminato=-1; max-age=' + cookieLifespan;
      createSelectboxAreaId1();
      if(navigator.userAgent.indexOf('msie') != -1 || navigator.userAgent.indexOf('trident') != -1) {

      } else {
        let speed = 500;
        let position= $('.setting-area').offset().top;
        $('.warning-message').hide();
        $('html, body').animate({scrollTop:position}, speed, 'swing');
      }
    } else {
      cookies.forEach( (cookie) => {
        cookieList[cookie.split('=')[0].replace('"', '').replace(' ', '')] = cookie.split('=')[1].replace('"', '').replace(' ', '');
      });
      if(navigator.userAgent.indexOf('msie') != -1 || navigator.userAgent.indexOf('trident') != -1) {

      } else {
        $('.warning-message').hide();
      }
      if (langFlag === -1) {
        lang = -1;
      } else {
        lang = parseInt(cookieList['lang_5374.jp-sakaiminato']);
        createSelectboxAreaId1();
      }
      if (areaId1Flag === -1) {
        areaId1 = -1;
      } else {
        areaId1 = parseInt(cookieList['areaId1_5374.jp-sakaiminato']);
        if (areaId2Flag === -1) {
          areaId2 = -1;
        } else {
          areaId2 = parseInt(cookieList['areaId2_5374.jp-sakaiminato']);
        }
        createSelectboxAreaId2();
      }
    }
  }

  function createSelectboxLang() {
    let langBox = $('#lang');
    let langTable = [];
    $.when (
      $.getJSON(baseUrl + language + '.json')
    ).done ( (data_a) => {
      langTable = data_a[language];
      langBox.append('<option value="-1">言語/Language</option>');
      langTable.forEach ( (langRecord) => {
        langBox.append('<option value="' + langRecord['id'] + '">' + langRecord['languageName'] + '</option>');
      });
      if (lang !== -1) {
        langBox.val(lang);
      }
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
    ).done( (data_a) => {
      let labelTable = data_a[labelString];

      labelTable.forEach( (labelRecord) => {
        if (labelRecord['languageId'] === lang) {
          labels.push(labelRecord['label']);
        }
      });
      $.when (
        $.getJSON(baseUrl + area + '.json'),
        $.getJSON(baseUrl + areaName + '.json')
      ).done ( (data_a, data_b) => {
        areaTable = data_a[0][area];
        areaNameTable = data_b[0][areaName];

        areaTable.sort( (a, b) => {
          if(a.sort < b.sort) return -1;
          if(a.sort > b.sort) return 1;
          return 0;
        });

        areaId1Box.append('<option value="-1">' + labels[44] + '</option>');
        areaTable.forEach ( (areaRecord) => {
          if (areaRecord['areaDivision'] === 0 || areaRecord['areaDivision'] === 1) {
            let areaString = '<option value="';
            areaString += areaRecord['id'];
            areaString += '">';
            areaNameTable.forEach( (areaNameRecord) => {
              if (areaNameRecord['areaId'] === areaRecord['id']) {
                if (areaNameRecord['languageId'] === lang ) {
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
    ).done( (data_a) => {
      let labelTable = data_a[labelString];

      labelTable.forEach( (labelRecord) => {
        if (labelRecord['languageId'] === lang) {
          labels.push(labelRecord['label']);
        }
      });
      if (areaId1 !== -1) {
        $.when (
          $.getJSON(baseUrl + area + '.json'),
          $.getJSON(baseUrl + areaName + '.json')
        ).done ( (data_a, data_b) => {
          areaTable = data_a[0][area];
          areaNameTable = data_b[0][areaName];
          areaDivision = 1;
          areaId2Box.append('<option value="-1">' + labels[45] + '</option>');
          areaTable.forEach ( (areaRecord) => {
            if(areaRecord['id'] === areaId1 && areaRecord['areaDivision'] === 0) {
              areaDivision = 0;
            }
            if (areaRecord['areaDivision'] === 2) {
              if ((areaId1 + 1) === areaRecord['id'] || (areaId1 + 2) === areaRecord['id']) {
                let areaString = '<option value="';
                areaString += areaRecord['id'];
                areaString += '">';
                areaNameTable.forEach( (areaNameRecord) => {
                  if (areaNameRecord['areaId'] === areaRecord['id']) {
                    if (areaNameRecord['languageId'] === lang ) {
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
          if(areaDivision === 0) {
            areaId2Box.empty();
            areaId2 = -1;
            document.cookie = 'areaId2_5374.jp-sakaiminato=-1; max-age=' + cookieLifespan;
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

  function drawingCalendar () {
    let calendarArea = $('.calendar');

    let today = new Date();
    let todayDay = today.getDate();
    let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    let toYear = today.getMonth() < 8 ? today.getFullYear(): today.getFullYear() - 1;

    let monthDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let isLeapYear = (y) => {
      return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
    };
    let firstWeek = firstDay.getDay();

    let thisArea = areaId2 === -1 ? areaId1 : areaId2;

    monthDate[1] = isLeapYear(firstDay.getFullYear()) ? 29 : 28;

    let calendar = [
      [
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
        ["", "", "", "", "", "", ""]
      ],
      [
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
        ["", "", "", "", "", "", ""]
      ],
      [
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
        ["", "", "", "", "", "", ""]
      ],
    ];
    let catWeek = [];
    let catDay = [];
    let todayRout = [];

    let i = 0, j = 0;
    let loopCount = 0;
    let dateCount = 0;
    let tableString = '';
    let noticeString = '';

    let labels = [];

    calendarArea.empty();

    $.when(
      $.getJSON(baseUrl + labelString + '.json')
    ).done( (data_a) => {
      let labelTable = data_a[labelString];

      labelTable.forEach( (labelRecord) => {
        if (labelRecord['languageId'] === lang) {
          labels.push(labelRecord['label']);
        }
      });
      if (((areaDivision !== 0) && (areaId2 !== -1)) || (areaDivision === 0)) {
        $.when(
          $.getJSON(baseUrl + routine + '.json'),
          $.getJSON(baseUrl + routineClassificationName + '.json')
        ).done( (data_a, data_b) => {
          let routineTable = data_a[0][routine];
          let routineClassificationNameTable = data_b[0][routineClassificationName];
          let langRoutineClassificationName = [];

          routineClassificationNameTable.forEach((routineClassificationNameRecord) => {
            if (routineClassificationNameRecord['languageId'] === lang) {
              langRoutineClassificationName.push(routineClassificationNameRecord['routineClassificationName']);
            }
          });

          routineTable.forEach( (routineRecord) => {
            if (routineRecord['areaId'] === thisArea) {
              if (routineRecord['year'] === toYear) {
                if (routineRecord['month'][today.getMonth() < 9 ? today.getMonth() + 4 : today.getMonth() - 9] === 1 ) {
                  let weeks = routineRecord['week'];
                  let days = routineRecord['day'];
                  let weekCount = 0;
                  catWeek[routineRecord['routineClassificationId']] = weeks;
                  catDay[routineRecord['routineClassificationId']] = days;
                  weeks.forEach( (week) => {
                    let dayCount = 0;
                    days.forEach( (day) => {
                      if (week === 1 && day === 1) {
                        calendar[routineRecord['routineClassificationId']][weekCount][dayCount] = '<span class="rout cat' + routineRecord['routineClassificationId'] + '">' +  langRoutineClassificationName[routineRecord['routineClassificationId']] + '</span>';
                      }
                      if (week === 2 || day === 2) {
                        calendar[routineRecord['routineClassificationId']][weekCount][dayCount] = '';
                      }
                      dayCount++;
                    });
                    weekCount++;
                  });
                }
              }
            }
          });
          tableString += '<table class="calendar-table"><caption>' + today.getFullYear() + labels[16] + (today.getMonth() + 1) + labels[17] + '</caption><tbody>';
          tableString += '<tr><td><br>' + labels[18] + '</td><td><br>' + labels[19] + '</td><td><br>' + labels[20] + '</td><td><br>' + labels[21] + '</td><td><br>' + labels[22] + '</td><td><br>' + labels[23] + '</td><td><br>' + labels[24] + '</td></tr>'
          dateCount = 1;
          for(i = 0; i <= 4; i++) {
            tableString += '<tr>';
            for(j = 0; j <= 6; j++) {
              tableString += '<td>';
              if ( (i === 0) && (j < firstWeek) ) {
                continue;
              }
              if ( dateCount <= monthDate[today.getMonth()]){
                tableString += '<span class="day">' + dateCount + '</span>';
                loopCount = 0;
                calendar.forEach((calendarCat)=>{
                  if (calendarCat[i][j] !== '') {
                    tableString += calendarCat[i][j];
                  }
                  if ((dateCount === todayDay) && (calendarCat[i][j] !== '')) {
                    todayRout.push(loopCount);
                  }
                  loopCount++;
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
          todayRout.forEach( (routineClassificationId) => {
            let weekCount = 1;
            let weekAddCount = 0;
            let dayAddCount = 0;
            let weekDayCount = 0;
            let weekString = '';
            let dateLang = [labels[18], labels[19], labels[20], labels[21], labels[22], labels[23], labels[24]];
            noticeString += '<h3>' + langRoutineClassificationName[routineClassificationId] + '</h3>';

            if (routineClassificationId === 3) {
              weekString += labels[26];
            } else  {
              weekString += labels[27];
            }
            catWeek[routineClassificationId].forEach ( (week) => {
              if ((weekAddCount > 0) && (week === 1)) {
                weekString += ',';
              }
              if (week === 1) {
                weekString += weekCount;
                weekAddCount++;
              }
              weekCount++;
            });
            if (weekAddCount === 5) {
              weekString = labels[28];
            }
            catDay[routineClassificationId].forEach ((day) => {
              if ((dayAddCount > 0) && (day === 1)) {
                weekString += ',';
              }
              if (day === 1) {
                weekString += dateLang[weekDayCount];
                dayAddCount++;
              }
              weekDayCount++;
            });
            weekString += labels[29];
            noticeString += '<p>' + weekString + ' ' + today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + '</p>';
          });
          if (todayRout.length > 0) {
            noticeString += '</div>';
          }
          calendarArea.append(noticeString);
          calendarArea.append(tableString)
        });
      }
    });
  }

  function loadNotification () {
    let notificationsArea = $('.notifications');
    let notificationContent = '';

    let today = new Date();

    let now = (today.getFullYear() * 10000) + ((today.getMonth() + 1) * 100) + today.getDate();

    let labels = [];

    notificationsArea.empty();

    $.when(
      $.getJSON(baseUrl + labelString + '.json')
    ).done( (data_a) => {
      let labelTable = data_a[labelString];

      labelTable.forEach( (labelRecord) => {
        if (labelRecord['languageId'] === lang) {
          labels.push(labelRecord['label']);
        }
      });

      $.when(
        $.getJSON(baseUrl + notification + '.json'),
        $.getJSON(baseUrl + notificationString + '.json')
      ).done( (data_a, data_b) => {
        let notificationTable = data_a[0][notification];
        let notificationStringTable = data_b[0][notificationString];

        notificationTable.sort( (a, b) => {
          if(a.date > b.date) return -1;
          if(a.date < b.date) return 1;
          return 0;
        });

        notificationContent += '<h2>' + labels[30] + '</h2>';

        notificationTable.forEach( (notificationRecord) => {
          let cautionFlag = notificationRecord['cautionFlag'];
          let notificationId = notificationRecord['id'];

          if ((notificationRecord['beginDate'] <= now) && (notificationRecord['endDate'] >= now) && (0 === notificationRecord['cautionFlag'])) {
            notificationStringTable.forEach( (notificationStringRecord) => {
              if ((lang === notificationStringRecord['languageId']) && (notificationId === notificationStringRecord['notificationId'])) {
                notificationContent += '<div class="notification"><div class="notification-head"><time datetime="' + (notificationRecord['date'] + '').slice(0, 4) + '-' + (notificationRecord['date'] + '').slice(4, 6) + '-' + (notificationRecord['date'] + '').slice(6, 8) + '">' + (notificationRecord['date'] + '').slice(0, 4) + labels[13] + ( parseInt( (notificationRecord['date'] + '').slice(4, 6) ) + '') + labels[14] + ( parseInt( (notificationRecord['date'] + '').slice(6, 8)) + '') + labels[15] + '</time>';
                notificationContent += '<h3>' + notificationStringRecord['title'] + '</h3></div>';
                notificationContent += '<div class="notification-body"><p>' + notificationStringRecord['notification'] + '</p></div></div>';
              }
            });
          }
        });
        notificationsArea.append(notificationContent);
        $('.notification-head').on( 'click', function() {
          $(this).next('.notification-body').slideToggle();
        });
        $('.notification-body').slideToggle();
      });
    });
  }

  function loadWarning () {
    let warningsArea = $('.warnings');
    let warningContent = '';
    let warningCount = 0;

    let today = new Date();

    let now = (today.getFullYear() * 10000) + ((today.getMonth() + 1) * 100) + today.getDate();

    let labels = [];

    warningsArea.empty();

    $.when(
      $.getJSON(baseUrl + labelString + '.json')
    ).done( (data_a) => {
      let labelTable = data_a[labelString];

      labelTable.forEach( (labelRecord) => {
        if (labelRecord['languageId'] === lang) {
          labels.push(labelRecord['label']);
        }
      });

      $.when(
        $.getJSON(baseUrl + notification + '.json'),
        $.getJSON(baseUrl + notificationString + '.json')
      ).done( (data_a, data_b) => {
        let notificationTable = data_a[0][notification];
        let notificationStringTable = data_b[0][notificationString];

        notificationTable.sort( (a, b) => {
          if(a.date > b.date) return -1;
          if(a.date < b.date) return 1;
          return 0;
        });

        warningContent += '<h2>' + labels[12] + '</h2>';

        notificationTable.forEach( (notificationRecord) => {
          let cautionFlag = notificationRecord['cautionFlag'];
          let notificationId = notificationRecord['id'];

          if ((notificationRecord['beginDate'] <= now) && (notificationRecord['endDate'] >= now) && (1 === notificationRecord['cautionFlag'])) {
            notificationStringTable.forEach( (notificationStringRecord) => {
              if ((lang === notificationStringRecord['languageId']) && (notificationId === notificationStringRecord['notificationId'])) {
                warningContent += '<div class="warning"><div class="warning-head"><time datetime="' + (notificationRecord['date'] + '').slice(0, 4) + '-' + (notificationRecord['date'] + '').slice(4, 6) + '-' + (notificationRecord['date'] + '').slice(6, 8) + '">' + (notificationRecord['date'] + '').slice(0, 4) + labels[13] + ( parseInt( (notificationRecord['date'] + '').slice(4, 6) ) + '') + labels[14] + ( parseInt( (notificationRecord['date'] + '').slice(6, 8)) + '') + labels[15] + '</time>';
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
          $('.warning-head').on( 'click', function() {
            $(this).next('.warning-body').slideToggle();
          });
          $('.warning-body').slideToggle();
        }
      });
    });
  }

  function getCenterData() {
    let centerArea = $('.recycle-station .accordion');
    let centerCount = 0;
    let labels = [];

    centerArea.empty();

    $.when(
      $.getJSON(baseUrl + labelString + '.json')
    ).done( (data_a) => {
      let labelTable = data_a[labelString];

      labelTable.forEach( (labelRecord) => {
        if (labelRecord['languageId'] === lang) {
          labels.push(labelRecord['label']);
        }
      });

      $.when(
        $.getJSON(baseUrl + center + '.json'),
        $.getJSON(baseUrl + centerName + '.json')
      ).done( (data_a, data_b) => {
        let centerTable = data_a[0][center];
        let centerNameTable = data_b[0][centerName];

        centerTable.forEach( (centerRecord) => {
          centerNameTable.forEach( (centerNameRecord) => {
            if (centerNameRecord['languageId'] === lang) {
              if (centerCount > 0) {
                centerArea.append('<hr>')
              }
              centerArea.append('<h3>' + centerNameRecord['centerName'] + '</h3>');
              centerArea.append('<img src="./img/' + centerRecord['image'] + '" alt="">');
              centerArea.append('<address><p>'+ centerNameRecord['address'] +'</p><p><i class="fas fa-phone-volume"></i>' + centerRecord['phoneNum'] + '</p></address>');
              centerCount++;
            }
          });
        });
      });
    });
  }

  function drawingLabels() {
    let labels = [];

    $.when(
      $.getJSON(baseUrl + labelString + '.json')
    ).done( (data_a) => {
      let labelTable = data_a[labelString];

      labelTable.forEach( (labelRecord) => {
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
    });
  }

  loadCookie();
  createSelectboxLang();
  loadWarning();
  loadNotification();
  getCenterData();
  drawingLabels();

  $('.accordion').slideToggle();

  $('.navi-button').on('click', (e) => {
    $('.global-navi').slideToggle();
  });

  $('a[href^="#"]').on('click', function () {

    $('.global-navi').slideToggle();

    var speed = 500;
    var href= $(this).attr("href");
    if (href !== '#apps-about') {
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $("html, body").animate({scrollTop:position}, speed, "swing");

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

  $('.about-app .close').on( 'click', function () {
    $('.about-app').css('left', '100%');
  });

  $('#transfer h2, #recycle-station h2, #oversize-garbage h2, #bring-in h2, #not-handle h2, #inquiry h2').on( 'click', function () {
    $(this).next('.accordion').slideToggle();
  });

  $('#gototop').on( 'click', function() {
    $("html,body").animate({scrollTop:0},"300");
  });

  $('#lang').change( (e) => {
    lang = parseInt($('#lang').val());

    document.cookie = 'lang_5374.jp-sakaiminato=' + lang + '; max-age=' + cookieLifespan;

    if (lang === -1) {
      lang = 0;
    }

    loadWarning();
    loadNotification();
    getCenterData();
    drawingLabels();
    createSelectboxAreaId1();
    if ((areaId1 !== -1) || (areaId2 !== -1)) {
      createSelectboxAreaId2();
    }
  });

  $('#area-id1').change( (e) => {
    areaId1 = parseInt($('#area-id1').val());
    document.cookie = 'areaId1_5374.jp-sakaiminato=' + areaId1 + '; max-age=' + cookieLifespan;
    createSelectboxAreaId2();
  });

  $('#area-id2').change( (e) => {
    areaId2 = parseInt($('#area-id2').val());
    document.cookie = 'areaId2_5374.jp-sakaiminato=' + areaId2 + '; max-age=' + cookieLifespan;
    drawingCalendar();
  });

  $('#search-text').change( (e) => {
    let searchBox = $('#search-text').val();
    let searchResult = $('.search-result');

    let labels = [];

    searchResult.empty();

    if (searchBox !== '') {
      $.when(
        $.getJSON(baseUrl + labelString + '.json')
      ).done( (data_a) => {
        let labelTable = data_a[labelString];

        labelTable.forEach( (labelRecord) => {
          if (labelRecord['languageId'] === lang) {
            labels.push(labelRecord['label']);
          }
        });

        $.when(
          $.getJSON(baseUrl + garbage + '.json'),
          $.getJSON(baseUrl + garbageName + '.json'),
          $.getJSON(baseUrl + classificationName + '.json')
        ).done( (data_a, data_b, data_c) => {
          let garbageTable = data_a[0][garbage];
          let garbageNameTable = data_b[0][garbageName];
          let classificationNameTable = data_c[0][classificationName];

          let classificationNameLang = {};

          let resultTable = [];

          classificationNameTable.forEach( (classificationNameRecord) => {
            if (classificationNameRecord['languageId'] === lang) {
              classificationNameLang[classificationNameRecord['classificationId']] = classificationNameRecord['classificationName'];
            }
          });
          garbageTable.forEach( (garbageRecord) => {
            garbageNameTable.forEach( (garbageNameRecord) => {
              if ((garbageNameRecord['garbageId'] === garbageRecord['id']) && (garbageNameRecord['languageId'] === lang) && garbageNameRecord['searchWord'].includes(searchBox)) {
                resultTable.push({'classification': classificationNameLang[garbageRecord['classificationId']], 'Name': garbageNameRecord['garbageName'], 'notice': garbageNameRecord['notice'] === '' ? labels[46] : garbageNameRecord['notice']});
              }
            });
          });
          searchResult.append('<div class="result-count">'+ labels[2] + resultTable.length + labels[3] + '</div>');
          if (resultTable.length > 0) {
            resultTable.forEach( (result) => {
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
