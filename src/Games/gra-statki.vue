<template>
    <div class = "container">
        <div class = "player1-container">
            <table :class = "board_table1">
                <tr>
                    <td v-if="check('00')" :class="getClass('00')" @click="setShip('00')"></td><td v-else-if="checkClicked('00')" :class="getClass('00')" @click="unSetShip('00')"> </td><td v-else :class="getClass('00')"> </td>
                    <td v-if="check('10')" :class="getClass('10')" @click="setShip('10')"></td><td v-else-if="checkClicked('10')" :class="getClass('10')" @click="unSetShip('10')"> </td><td v-else :class="getClass('10')"> </td>
                    <td v-if="check('20')" :class="getClass('20')" @click="setShip('20')"></td><td v-else-if="checkClicked('20')" :class="getClass('20')" @click="unSetShip('20')"> </td><td v-else :class="getClass('20')"> </td>
                    <td v-if="check('30')" :class="getClass('30')" @click="setShip('30')"></td><td v-else-if="checkClicked('30')" :class="getClass('30')" @click="unSetShip('30')"> </td><td v-else :class="getClass('30')"> </td>
                    <td v-if="check('40')" :class="getClass('40')" @click="setShip('40')"></td><td v-else-if="checkClicked('40')" :class="getClass('40')" @click="unSetShip('40')"> </td><td v-else :class="getClass('40')"> </td>
                    <td v-if="check('50')" :class="getClass('50')" @click="setShip('50')"></td><td v-else-if="checkClicked('50')" :class="getClass('50')" @click="unSetShip('50')"> </td><td v-else :class="getClass('50')"> </td>
                    <td v-if="check('60')" :class="getClass('60')" @click="setShip('60')"></td><td v-else-if="checkClicked('60')" :class="getClass('60')" @click="unSetShip('60')"> </td><td v-else :class="getClass('60')"> </td>
                    <td v-if="check('70')" :class="getClass('70')" @click="setShip('70')"></td><td v-else-if="checkClicked('70')" :class="getClass('70')" @click="unSetShip('70')"> </td><td v-else :class="getClass('70')"> </td>
                </tr>
                <tr>
                    <td v-if="check('01')" :class="getClass('01')" @click="setShip('01')"></td><td v-else-if="checkClicked('01')" :class="getClass('01')" @click="unSetShip('01')"> </td><td v-else :class="getClass('01')"> </td>
                    <td v-if="check('11')" :class="getClass('11')" @click="setShip('11')"></td><td v-else-if="checkClicked('11')" :class="getClass('11')" @click="unSetShip('11')"> </td><td v-else :class="getClass('11')"> </td>
                    <td v-if="check('21')" :class="getClass('21')" @click="setShip('21')"></td><td v-else-if="checkClicked('21')" :class="getClass('21')" @click="unSetShip('21')"> </td><td v-else :class="getClass('21')"> </td>
                    <td v-if="check('31')" :class="getClass('31')" @click="setShip('31')"></td><td v-else-if="checkClicked('31')" :class="getClass('31')" @click="unSetShip('31')"> </td><td v-else :class="getClass('31')"> </td>
                    <td v-if="check('41')" :class="getClass('41')" @click="setShip('41')"></td><td v-else-if="checkClicked('41')" :class="getClass('41')" @click="unSetShip('41')"> </td><td v-else :class="getClass('41')"> </td>
                    <td v-if="check('51')" :class="getClass('51')" @click="setShip('51')"></td><td v-else-if="checkClicked('51')" :class="getClass('51')" @click="unSetShip('51')"> </td><td v-else :class="getClass('51')"> </td>
                    <td v-if="check('61')" :class="getClass('61')" @click="setShip('61')"></td><td v-else-if="checkClicked('61')" :class="getClass('61')" @click="unSetShip('61')"> </td><td v-else :class="getClass('61')"> </td>
                    <td v-if="check('71')" :class="getClass('71')" @click="setShip('71')"></td><td v-else-if="checkClicked('71')" :class="getClass('71')" @click="unSetShip('71')"> </td><td v-else :class="getClass('71')"> </td>
                </tr>
                <tr>
                    <td v-if="check('02')" :class="getClass('02')" @click="setShip('02')"></td><td v-else-if="checkClicked('02')" :class="getClass('02')" @click="unSetShip('02')"> </td><td v-else :class="getClass('02')"> </td>
                    <td v-if="check('12')" :class="getClass('12')" @click="setShip('12')"></td><td v-else-if="checkClicked('12')" :class="getClass('12')" @click="unSetShip('03')"> </td><td v-else :class="getClass('12')"> </td>
                    <td v-if="check('22')" :class="getClass('22')" @click="setShip('22')"></td><td v-else-if="checkClicked('22')" :class="getClass('22')" @click="unSetShip('22')"> </td><td v-else :class="getClass('22')"> </td>
                    <td v-if="check('32')" :class="getClass('32')" @click="setShip('32')"></td><td v-else-if="checkClicked('32')" :class="getClass('32')" @click="unSetShip('32')"> </td><td v-else :class="getClass('32')"> </td>
                    <td v-if="check('42')" :class="getClass('42')" @click="setShip('42')"></td><td v-else-if="checkClicked('42')" :class="getClass('42')" @click="unSetShip('42')"> </td><td v-else :class="getClass('42')"> </td>
                    <td v-if="check('52')" :class="getClass('52')" @click="setShip('52')"></td><td v-else-if="checkClicked('52')" :class="getClass('52')" @click="unSetShip('52')"> </td><td v-else :class="getClass('52')"> </td>
                    <td v-if="check('62')" :class="getClass('62')" @click="setShip('62')"></td><td v-else-if="checkClicked('62')" :class="getClass('62')" @click="unSetShip('62')"> </td><td v-else :class="getClass('62')"> </td>
                    <td v-if="check('72')" :class="getClass('72')" @click="setShip('72')"></td><td v-else-if="checkClicked('72')" :class="getClass('72')" @click="unSetShip('72')"> </td><td v-else :class="getClass('72')"> </td>
                </tr>
                <tr>
                    <td v-if="check('03')" :class="getClass('03')" @click="setShip('03')"></td><td v-else-if="checkClicked('03')" :class="getClass('03')" @click="unSetShip('03')"> </td><td v-else :class="getClass('03')"> </td>
                    <td v-if="check('13')" :class="getClass('13')" @click="setShip('13')"></td><td v-else-if="checkClicked('13')" :class="getClass('13')" @click="unSetShip('13')"> </td><td v-else :class="getClass('13')"> </td>
                    <td v-if="check('23')" :class="getClass('23')" @click="setShip('23')"></td><td v-else-if="checkClicked('23')" :class="getClass('23')" @click="unSetShip('23')"> </td><td v-else :class="getClass('23')"> </td>
                    <td v-if="check('33')" :class="getClass('33')" @click="setShip('33')"></td><td v-else-if="checkClicked('33')" :class="getClass('33')" @click="unSetShip('33')"> </td><td v-else :class="getClass('33')"> </td>
                    <td v-if="check('43')" :class="getClass('43')" @click="setShip('43')"></td><td v-else-if="checkClicked('43')" :class="getClass('43')" @click="unSetShip('43')"> </td><td v-else :class="getClass('43')"> </td>
                    <td v-if="check('53')" :class="getClass('53')" @click="setShip('53')"></td><td v-else-if="checkClicked('53')" :class="getClass('53')" @click="unSetShip('53')"> </td><td v-else :class="getClass('53')"> </td>
                    <td v-if="check('63')" :class="getClass('63')" @click="setShip('63')"></td><td v-else-if="checkClicked('63')" :class="getClass('63')" @click="unSetShip('63')"> </td><td v-else :class="getClass('63')"> </td>
                    <td v-if="check('73')" :class="getClass('73')" @click="setShip('73')"></td><td v-else-if="checkClicked('73')" :class="getClass('73')" @click="unSetShip('73')"> </td><td v-else :class="getClass('73')"> </td>
                </tr>
                <tr>
                    <td v-if="check('04')" :class="getClass('04')" @click="setShip('04')"></td><td v-else-if="checkClicked('04')" :class="getClass('04')" @click="unSetShip('04')"> </td><td v-else :class="getClass('04')"> </td>
                    <td v-if="check('14')" :class="getClass('14')" @click="setShip('14')"></td><td v-else-if="checkClicked('14')" :class="getClass('14')" @click="unSetShip('14')"> </td><td v-else :class="getClass('14')"> </td>
                    <td v-if="check('24')" :class="getClass('24')" @click="setShip('24')"></td><td v-else-if="checkClicked('24')" :class="getClass('24')" @click="unSetShip('24')"> </td><td v-else :class="getClass('24')"> </td>
                    <td v-if="check('34')" :class="getClass('34')" @click="setShip('34')"></td><td v-else-if="checkClicked('34')" :class="getClass('34')" @click="unSetShip('34')"> </td><td v-else :class="getClass('34')"> </td>
                    <td v-if="check('44')" :class="getClass('44')" @click="setShip('44')"></td><td v-else-if="checkClicked('44')" :class="getClass('44')" @click="unSetShip('44')"> </td><td v-else :class="getClass('44')"> </td>
                    <td v-if="check('54')" :class="getClass('54')" @click="setShip('54')"></td><td v-else-if="checkClicked('54')" :class="getClass('54')" @click="unSetShip('54')"> </td><td v-else :class="getClass('54')"> </td>
                    <td v-if="check('64')" :class="getClass('64')" @click="setShip('64')"></td><td v-else-if="checkClicked('64')" :class="getClass('64')" @click="unSetShip('64')"> </td><td v-else :class="getClass('64')"> </td>
                    <td v-if="check('74')" :class="getClass('74')" @click="setShip('74')"></td><td v-else-if="checkClicked('74')" :class="getClass('74')" @click="unSetShip('74')"> </td><td v-else :class="getClass('74')"> </td>
                </tr>
                <tr>
                    <td v-if="check('05')" :class="getClass('05')" @click="setShip('05')"></td><td v-else-if="checkClicked('05')" :class="getClass('05')" @click="unSetShip('05')"> </td><td v-else :class="getClass('05')"> </td>
                    <td v-if="check('15')" :class="getClass('15')" @click="setShip('15')"></td><td v-else-if="checkClicked('15')" :class="getClass('15')" @click="unSetShip('15')"> </td><td v-else :class="getClass('15')"> </td>
                    <td v-if="check('25')" :class="getClass('25')" @click="setShip('25')"></td><td v-else-if="checkClicked('25')" :class="getClass('25')" @click="unSetShip('25')"> </td><td v-else :class="getClass('25')"> </td>
                    <td v-if="check('35')" :class="getClass('35')" @click="setShip('35')"></td><td v-else-if="checkClicked('35')" :class="getClass('35')" @click="unSetShip('35')"> </td><td v-else :class="getClass('35')"> </td>
                    <td v-if="check('45')" :class="getClass('45')" @click="setShip('45')"></td><td v-else-if="checkClicked('45')" :class="getClass('45')" @click="unSetShip('45')"> </td><td v-else :class="getClass('45')"> </td>
                    <td v-if="check('55')" :class="getClass('55')" @click="setShip('55')"></td><td v-else-if="checkClicked('55')" :class="getClass('55')" @click="unSetShip('55')"> </td><td v-else :class="getClass('55')"> </td>
                    <td v-if="check('65')" :class="getClass('65')" @click="setShip('65')"></td><td v-else-if="checkClicked('65')" :class="getClass('65')" @click="unSetShip('65')"> </td><td v-else :class="getClass('65')"> </td>
                    <td v-if="check('75')" :class="getClass('75')" @click="setShip('75')"></td><td v-else-if="checkClicked('75')" :class="getClass('75')" @click="unSetShip('75')"> </td><td v-else :class="getClass('75')"> </td>
                </tr>
                <tr>
                    <td v-if="check('06')" :class="getClass('06')" @click="setShip('06')"></td><td v-else-if="checkClicked('06')" :class="getClass('06')" @click="unSetShip('06')"> </td><td v-else :class="getClass('06')"> </td>
                    <td v-if="check('16')" :class="getClass('16')" @click="setShip('16')"></td><td v-else-if="checkClicked('16')" :class="getClass('16')" @click="unSetShip('16')"> </td><td v-else :class="getClass('16')"> </td>
                    <td v-if="check('26')" :class="getClass('26')" @click="setShip('26')"></td><td v-else-if="checkClicked('26')" :class="getClass('26')" @click="unSetShip('26')"> </td><td v-else :class="getClass('26')"> </td>
                    <td v-if="check('36')" :class="getClass('36')" @click="setShip('36')"></td><td v-else-if="checkClicked('36')" :class="getClass('36')" @click="unSetShip('36')"> </td><td v-else :class="getClass('36')"> </td>
                    <td v-if="check('46')" :class="getClass('46')" @click="setShip('46')"></td><td v-else-if="checkClicked('46')" :class="getClass('46')" @click="unSetShip('46')"> </td><td v-else :class="getClass('46')"> </td>
                    <td v-if="check('56')" :class="getClass('56')" @click="setShip('56')"></td><td v-else-if="checkClicked('56')" :class="getClass('56')" @click="unSetShip('56')"> </td><td v-else :class="getClass('56')"> </td>
                    <td v-if="check('66')" :class="getClass('66')" @click="setShip('66')"></td><td v-else-if="checkClicked('66')" :class="getClass('66')" @click="unSetShip('66')"> </td><td v-else :class="getClass('66')"> </td>
                    <td v-if="check('76')" :class="getClass('76')" @click="setShip('76')"></td><td v-else-if="checkClicked('76')" :class="getClass('76')" @click="unSetShip('76')"> </td><td v-else :class="getClass('76')"> </td>
                </tr>
                <tr>
                    <td v-if="check('07')" :class="getClass('07')" @click="setShip('07')"></td><td v-else-if="checkClicked('07')" :class="getClass('07')" @click="unSetShip('07')"> </td><td v-else :class="getClass('07')"> </td>
                    <td v-if="check('17')" :class="getClass('17')" @click="setShip('17')"></td><td v-else-if="checkClicked('17')" :class="getClass('17')" @click="unSetShip('17')"> </td><td v-else :class="getClass('17')"> </td>
                    <td v-if="check('27')" :class="getClass('27')" @click="setShip('27')"></td><td v-else-if="checkClicked('27')" :class="getClass('27')" @click="unSetShip('27')"> </td><td v-else :class="getClass('27')"> </td>
                    <td v-if="check('37')" :class="getClass('37')" @click="setShip('37')"></td><td v-else-if="checkClicked('37')" :class="getClass('37')" @click="unSetShip('37')"> </td><td v-else :class="getClass('37')"> </td>
                    <td v-if="check('47')" :class="getClass('47')" @click="setShip('47')"></td><td v-else-if="checkClicked('47')" :class="getClass('47')" @click="unSetShip('47')"> </td><td v-else :class="getClass('47')"> </td>
                    <td v-if="check('57')" :class="getClass('57')" @click="setShip('57')"></td><td v-else-if="checkClicked('57')" :class="getClass('57')" @click="unSetShip('57')"> </td><td v-else :class="getClass('57')"> </td>
                    <td v-if="check('67')" :class="getClass('67')" @click="setShip('67')"></td><td v-else-if="checkClicked('67')" :class="getClass('67')" @click="unSetShip('67')"> </td><td v-else :class="getClass('67')"> </td>
                    <td v-if="check('77')" :class="getClass('77')" @click="setShip('77')"></td><td v-else-if="checkClicked('77')" :class="getClass('77')" @click="unSetShip('77')"> </td><td v-else :class="getClass('77')"></td>
                </tr>
            </table>
            <div class="shipCounter">
            <div class="counterFour"><p class="shipImage"></p><p class="shipImage"></p><p class="shipImage"></p><p class="shipImage"></p><p class="shipCount">{{ fourCounter }}</p></div>
            <div class="counterThree"><p class="shipImage"></p><p class="shipImage"></p><p class="shipImage"></p><p class="shipCount">{{ threeCounter }}</p></div>
            <div class="counterTwo"><p class="shipImage"></p><p class="shipImage"></p><p class="shipCount">{{ twoCounter }}</p></div>
            <div class="counterOne"><p class="shipImage"></p><p class="shipCount">{{ oneCounter }}</p></div>
            </div>

        </div>
        <div class = "player2-container">
            <table class = "board-table2">

                <tr>
                    <td v-if = "selectTag('00') === shipOponent || emptyOponent" :class="getOponentClass('00')" @click = "mark('00')"></td><td v-else-if="selectTag('00') === 'hitOponent'" :class="getOponentClass('00')"></td><td v-else-if = "selectTag('00') === 'missedOponent'" :class="getOponentClass('00')"></td>
                    <td v-if = "selectTag('10') === shipOponent || emptyOponent" :class="getOponentClass('10')" @click = "mark('10')"></td><td v-else-if="selectTag('10') === 'hitOponent'" :class="getOponentClass('10')"></td><td v-else-if = "selectTag('10') === 'missedOponent'" :class="getOponentClass('10')"></td>
                    <td v-if = "selectTag('20') === shipOponent || emptyOponent" :class="getOponentClass('20')" @click = "mark('20')"></td><td v-else-if="selectTag('20') === 'hitOponent'" :class="getOponentClass('20')"></td><td v-else-if = "selectTag('20') === 'missedOponent'" :class="getOponentClass('20')"></td>
                    <td v-if = "selectTag('30') === shipOponent || emptyOponent" :class="getOponentClass('30')" @click = "mark('30')"></td><td v-else-if="selectTag('30') === 'hitOponent'" :class="getOponentClass('30')"></td><td v-else-if = "selectTag('30') === 'missedOponent'" :class="getOponentClass('30')"></td>
                    <td v-if = "selectTag('40') === shipOponent || emptyOponent" :class="getOponentClass('40')" @click = "mark('40')"></td><td v-else-if="selectTag('40') === 'hitOponent'" :class="getOponentClass('40')"></td><td v-else-if = "selectTag('40') === 'missedOponent'" :class="getOponentClass('40')"></td>
                    <td v-if = "selectTag('50') === shipOponent || emptyOponent" :class="getOponentClass('50')" @click = "mark('50')"></td><td v-else-if="selectTag('50') === 'hitOponent'" :class="getOponentClass('50')"></td><td v-else-if = "selectTag('50') === 'missedOponent'" :class="getOponentClass('50')"></td>
                    <td v-if = "selectTag('60') === shipOponent || emptyOponent" :class="getOponentClass('60')" @click = "mark('60')"></td><td v-else-if="selectTag('60') === 'hitOponent'" :class="getOponentClass('60')"></td><td v-else-if = "selectTag('60') === 'missedOponent'" :class="getOponentClass('60')"></td>
                    <td v-if = "selectTag('70') === shipOponent || emptyOponent" :class="getOponentClass('70')" @click = "mark('70')"></td><td v-else-if="selectTag('70') === 'hitOponent'" :class="getOponentClass('70')"></td><td v-else-if = "selectTag('70') === 'missedOponent'" :class="getOponentClass('70')"></td>
                </tr>
                <tr>
                    <td v-if = "selectTag('01') === shipOponent || emptyOponent" :class="getOponentClass('01')" @click = "mark('01')"></td><td v-else-if="selectTag('01') === 'hitOponent'" :class="getOponentClass('01')"></td><td v-else-if = "selectTag('01') === 'missedOponent'" :class="getOponentClass('01')"></td>
                    <td v-if = "selectTag('11') === shipOponent || emptyOponent" :class="getOponentClass('11')" @click = "mark('11')"></td><td v-else-if="selectTag('11') === 'hitOponent'" :class="getOponentClass('11')"></td><td v-else-if = "selectTag('11') === 'missedOponent'" :class="getOponentClass('11')"></td>
                    <td v-if = "selectTag('21') === shipOponent || emptyOponent" :class="getOponentClass('21')" @click = "mark('21')"></td><td v-else-if="selectTag('21') === 'hitOponent'" :class="getOponentClass('21')"></td><td v-else-if = "selectTag('21') === 'missedOponent'" :class="getOponentClass('21')"></td>
                    <td v-if = "selectTag('31') === shipOponent || emptyOponent" :class="getOponentClass('31')" @click = "mark('31')"></td><td v-else-if="selectTag('31') === 'hitOponent'" :class="getOponentClass('31')"></td><td v-else-if = "selectTag('31') === 'missedOponent'" :class="getOponentClass('31')"></td>
                    <td v-if = "selectTag('41') === shipOponent || emptyOponent" :class="getOponentClass('41')" @click = "mark('41')"></td><td v-else-if="selectTag('41') === 'hitOponent'" :class="getOponentClass('41')"></td><td v-else-if = "selectTag('41') === 'missedOponent'" :class="getOponentClass('41')"></td>
                    <td v-if = "selectTag('51') === shipOponent || emptyOponent" :class="getOponentClass('51')" @click = "mark('51')"></td><td v-else-if="selectTag('51') === 'hitOponent'" :class="getOponentClass('51')"></td><td v-else-if = "selectTag('51') === 'missedOponent'" :class="getOponentClass('51')"></td>
                    <td v-if = "selectTag('61') === shipOponent || emptyOponent" :class="getOponentClass('61')" @click = "mark('61')"></td><td v-else-if="selectTag('61') === 'hitOponent'" :class="getOponentClass('61')"></td><td v-else-if = "selectTag('61') === 'missedOponent'" :class="getOponentClass('61')"></td>
                    <td v-if = "selectTag('71') === shipOponent || emptyOponent" :class="getOponentClass('71')" @click = "mark('71')"></td><td v-else-if="selectTag('71') === 'hitOponent'" :class="getOponentClass('71')"></td><td v-else-if = "selectTag('71') === 'missedOponent'" :class="getOponentClass('71')"></td>
                </tr>
                <tr>
                    <td v-if = "selectTag('02') === shipOponent || emptyOponent" :class="getOponentClass('02')" @click = "mark('02')"></td><td v-else-if="selectTag('02') === 'hitOponent'" :class="getOponentClass('02')"></td><td v-else-if = "selectTag('02') === 'missedOponent'" :class="getOponentClass('02')"></td>
                    <td v-if = "selectTag('12') === shipOponent || emptyOponent" :class="getOponentClass('12')" @click = "mark('12')"></td><td v-else-if="selectTag('12') === 'hitOponent'" :class="getOponentClass('12')"></td><td v-else-if = "selectTag('12') === 'missedOponent'" :class="getOponentClass('12')"></td>
                    <td v-if = "selectTag('22') === shipOponent || emptyOponent" :class="getOponentClass('22')" @click = "mark('22')"></td><td v-else-if="selectTag('22') === 'hitOponent'" :class="getOponentClass('22')"></td><td v-else-if = "selectTag('22') === 'missedOponent'" :class="getOponentClass('22')"></td>
                    <td v-if = "selectTag('32') === shipOponent || emptyOponent" :class="getOponentClass('32')" @click = "mark('32')"></td><td v-else-if="selectTag('32') === 'hitOponent'" :class="getOponentClass('32')"></td><td v-else-if = "selectTag('32') === 'missedOponent'" :class="getOponentClass('32')"></td>
                    <td v-if = "selectTag('42') === shipOponent || emptyOponent" :class="getOponentClass('42')" @click = "mark('42')"></td><td v-else-if="selectTag('42') === 'hitOponent'" :class="getOponentClass('42')"></td><td v-else-if = "selectTag('42') === 'missedOponent'" :class="getOponentClass('42')"></td>
                    <td v-if = "selectTag('52') === shipOponent || emptyOponent" :class="getOponentClass('52')" @click = "mark('52')"></td><td v-else-if="selectTag('52') === 'hitOponent'" :class="getOponentClass('52')"></td><td v-else-if = "selectTag('52') === 'missedOponent'" :class="getOponentClass('52')"></td>
                    <td v-if = "selectTag('62') === shipOponent || emptyOponent" :class="getOponentClass('62')" @click = "mark('62')"></td><td v-else-if="selectTag('62') === 'hitOponent'" :class="getOponentClass('62')"></td><td v-else-if = "selectTag('62') === 'missedOponent'" :class="getOponentClass('62')"></td>
                    <td v-if = "selectTag('72') === shipOponent || emptyOponent" :class="getOponentClass('72')" @click = "mark('72')"></td><td v-else-if="selectTag('72') === 'hitOponent'" :class="getOponentClass('72')"></td><td v-else-if = "selectTag('72') === 'missedOponent'" :class="getOponentClass('72')"></td>
                </tr>
                <tr>
                    <td v-if = "selectTag('03') === shipOponent || emptyOponent" :class="getOponentClass('03')" @click = "mark('03')"></td><td v-else-if="selectTag('03') === 'hitOponent'" :class="getOponentClass('03')"></td><td v-else-if = "selectTag('03') === 'missedOponent'" :class="getOponentClass('03')"></td>
                    <td v-if = "selectTag('13') === shipOponent || emptyOponent" :class="getOponentClass('13')" @click = "mark('13')"></td><td v-else-if="selectTag('13') === 'hitOponent'" :class="getOponentClass('13')"></td><td v-else-if = "selectTag('13') === 'missedOponent'" :class="getOponentClass('13')"></td>
                    <td v-if = "selectTag('23') === shipOponent || emptyOponent" :class="getOponentClass('23')" @click = "mark('23')"></td><td v-else-if="selectTag('23') === 'hitOponent'" :class="getOponentClass('23')"></td><td v-else-if = "selectTag('23') === 'missedOponent'" :class="getOponentClass('23')"></td>
                    <td v-if = "selectTag('33') === shipOponent || emptyOponent" :class="getOponentClass('33')" @click = "mark('33')"></td><td v-else-if="selectTag('33') === 'hitOponent'" :class="getOponentClass('33')"></td><td v-else-if = "selectTag('33') === 'missedOponent'" :class="getOponentClass('33')"></td>
                    <td v-if = "selectTag('43') === shipOponent || emptyOponent" :class="getOponentClass('43')" @click = "mark('43')"></td><td v-else-if="selectTag('43') === 'hitOponent'" :class="getOponentClass('43')"></td><td v-else-if = "selectTag('43') === 'missedOponent'" :class="getOponentClass('43')"></td>
                    <td v-if = "selectTag('53') === shipOponent || emptyOponent" :class="getOponentClass('53')" @click = "mark('53')"></td><td v-else-if="selectTag('53') === 'hitOponent'" :class="getOponentClass('53')"></td><td v-else-if = "selectTag('53') === 'missedOponent'" :class="getOponentClass('53')"></td>
                    <td v-if = "selectTag('63') === shipOponent || emptyOponent" :class="getOponentClass('63')" @click = "mark('63')"></td><td v-else-if="selectTag('63') === 'hitOponent'" :class="getOponentClass('63')"></td><td v-else-if = "selectTag('63') === 'missedOponent'" :class="getOponentClass('63')"></td>
                    <td v-if = "selectTag('73') === shipOponent || emptyOponent" :class="getOponentClass('73')" @click = "mark('73')"></td><td v-else-if="selectTag('73') === 'hitOponent'" :class="getOponentClass('73')"></td><td v-else-if = "selectTag('73') === 'missedOponent'" :class="getOponentClass('73')"></td>
                </tr>
                <tr>
                    <td v-if = "selectTag('04') === shipOponent || emptyOponent" :class="getOponentClass('04')" @click = "mark('04')"></td><td v-else-if="selectTag('04') === 'hitOponent'" :class="getOponentClass('04')"></td><td v-else-if = "selectTag('04') === 'missedOponent'" :class="getOponentClass('04')"></td>
                    <td v-if = "selectTag('14') === shipOponent || emptyOponent" :class="getOponentClass('14')" @click = "mark('14')"></td><td v-else-if="selectTag('14') === 'hitOponent'" :class="getOponentClass('14')"></td><td v-else-if = "selectTag('14') === 'missedOponent'" :class="getOponentClass('14')"></td>
                    <td v-if = "selectTag('24') === shipOponent || emptyOponent" :class="getOponentClass('24')" @click = "mark('24')"></td><td v-else-if="selectTag('24') === 'hitOponent'" :class="getOponentClass('24')"></td><td v-else-if = "selectTag('24') === 'missedOponent'" :class="getOponentClass('24')"></td>
                    <td v-if = "selectTag('34') === shipOponent || emptyOponent" :class="getOponentClass('34')" @click = "mark('34')"></td><td v-else-if="selectTag('34') === 'hitOponent'" :class="getOponentClass('34')"></td><td v-else-if = "selectTag('34') === 'missedOponent'" :class="getOponentClass('34')"></td>
                    <td v-if = "selectTag('44') === shipOponent || emptyOponent" :class="getOponentClass('44')" @click = "mark('44')"></td><td v-else-if="selectTag('44') === 'hitOponent'" :class="getOponentClass('44')"></td><td v-else-if = "selectTag('44') === 'missedOponent'" :class="getOponentClass('44')"></td>
                    <td v-if = "selectTag('54') === shipOponent || emptyOponent" :class="getOponentClass('54')" @click = "mark('54')"></td><td v-else-if="selectTag('54') === 'hitOponent'" :class="getOponentClass('45')"></td><td v-else-if = "selectTag('54') === 'missedOponent'" :class="getOponentClass('44')"></td>
                    <td v-if = "selectTag('64') === shipOponent || emptyOponent" :class="getOponentClass('64')" @click = "mark('64')"></td><td v-else-if="selectTag('64') === 'hitOponent'" :class="getOponentClass('46')"></td><td v-else-if = "selectTag('64') === 'missedOponent'" :class="getOponentClass('64')"></td>
                    <td v-if = "selectTag('74') === shipOponent || emptyOponent" :class="getOponentClass('74')" @click = "mark('74')"></td><td v-else-if="selectTag('75') === 'hitOponent'" :class="getOponentClass('47')"></td><td v-else-if = "selectTag('74') === 'missedOponent'" :class="getOponentClass('74')"></td>
                </tr>
                <tr>
                    <td v-if = "selectTag('05') === shipOponent || emptyOponent" :class="getOponentClass('05')" @click = "mark('05')"></td><td v-else-if="selectTag('05') === 'hitOponent'" :class="getOponentClass('05')"></td><td v-else-if = "selectTag('05') === 'missedOponent'" :class="getOponentClass('05')"></td>
                    <td v-if = "selectTag('15') === shipOponent || emptyOponent" :class="getOponentClass('15')" @click = "mark('15')"></td><td v-else-if="selectTag('15') === 'hitOponent'" :class="getOponentClass('15')"></td><td v-else-if = "selectTag('15') === 'missedOponent'" :class="getOponentClass('15')"></td>
                    <td v-if = "selectTag('25') === shipOponent || emptyOponent" :class="getOponentClass('25')" @click = "mark('25')"></td><td v-else-if="selectTag('25') === 'hitOponent'" :class="getOponentClass('25')"></td><td v-else-if = "selectTag('25') === 'missedOponent'" :class="getOponentClass('25')"></td>
                    <td v-if = "selectTag('35') === shipOponent || emptyOponent" :class="getOponentClass('35')" @click = "mark('35')"></td><td v-else-if="selectTag('35') === 'hitOponent'" :class="getOponentClass('35')"></td><td v-else-if = "selectTag('35') === 'missedOponent'" :class="getOponentClass('35')"></td>
                    <td v-if = "selectTag('45') === shipOponent || emptyOponent" :class="getOponentClass('45')" @click = "mark('45')"></td><td v-else-if="selectTag('45') === 'hitOponent'" :class="getOponentClass('45')"></td><td v-else-if = "selectTag('45') === 'missedOponent'" :class="getOponentClass('45')"></td>
                    <td v-if = "selectTag('55') === shipOponent || emptyOponent" :class="getOponentClass('55')" @click = "mark('55')"></td><td v-else-if="selectTag('55') === 'hitOponent'" :class="getOponentClass('55')"></td><td v-else-if = "selectTag('55') === 'missedOponent'" :class="getOponentClass('55')"></td>
                    <td v-if = "selectTag('65') === shipOponent || emptyOponent" :class="getOponentClass('65')" @click = "mark('65')"></td><td v-else-if="selectTag('65') === 'hitOponent'" :class="getOponentClass('65')"></td><td v-else-if = "selectTag('65') === 'missedOponent'" :class="getOponentClass('65')"></td>
                    <td v-if = "selectTag('75') === shipOponent || emptyOponent" :class="getOponentClass('75')" @click = "mark('75')"></td><td v-else-if="selectTag('75') === 'hitOponent'" :class="getOponentClass('75')"></td><td v-else-if = "selectTag('75') === 'missedOponent'" :class="getOponentClass('75')"></td>
                </tr>
                <tr>
                    <td v-if = "selectTag('06') === shipOponent || emptyOponent" :class="getOponentClass('06')" @click = "mark('06')"></td><td v-else-if="selectTag('06') === 'hitOponent'" :class="getOponentClass('06')"></td><td v-else-if = "selectTag('06') === 'missedOponent'" :class="getOponentClass('06')"></td>
                    <td v-if = "selectTag('16') === shipOponent || emptyOponent" :class="getOponentClass('16')" @click = "mark('16')"></td><td v-else-if="selectTag('16') === 'hitOponent'" :class="getOponentClass('16')"></td><td v-else-if = "selectTag('16') === 'missedOponent'" :class="getOponentClass('16')"></td>
                    <td v-if = "selectTag('26') === shipOponent || emptyOponent" :class="getOponentClass('26')" @click = "mark('26')"></td><td v-else-if="selectTag('26') === 'hitOponent'" :class="getOponentClass('26')"></td><td v-else-if = "selectTag('26') === 'missedOponent'" :class="getOponentClass('26')"></td>
                    <td v-if = "selectTag('36') === shipOponent || emptyOponent" :class="getOponentClass('36')" @click = "mark('36')"></td><td v-else-if="selectTag('36') === 'hitOponent'" :class="getOponentClass('36')"></td><td v-else-if = "selectTag('36') === 'missedOponent'" :class="getOponentClass('36')"></td>
                    <td v-if = "selectTag('46') === shipOponent || emptyOponent" :class="getOponentClass('46')" @click = "mark('46')"></td><td v-else-if="selectTag('46') === 'hitOponent'" :class="getOponentClass('46')"></td><td v-else-if = "selectTag('46') === 'missedOponent'" :class="getOponentClass('46')"></td>
                    <td v-if = "selectTag('56') === shipOponent || emptyOponent" :class="getOponentClass('56')" @click = "mark('56')"></td><td v-else-if="selectTag('56') === 'hitOponent'" :class="getOponentClass('56')"></td><td v-else-if = "selectTag('56') === 'missedOponent'" :class="getOponentClass('56')"></td>
                    <td v-if = "selectTag('66') === shipOponent || emptyOponent" :class="getOponentClass('66')" @click = "mark('66')"></td><td v-else-if="selectTag('66') === 'hitOponent'" :class="getOponentClass('66')"></td><td v-else-if = "selectTag('66') === 'missedOponent'" :class="getOponentClass('66')"></td>
                    <td v-if = "selectTag('76') === shipOponent || emptyOponent" :class="getOponentClass('76')" @click = "mark('76')"></td><td v-else-if="selectTag('76') === 'hitOponent'" :class="getOponentClass('76')"></td><td v-else-if = "selectTag('76') === 'missedOponent'" :class="getOponentClass('76')"></td>
                </tr>
                <tr>
                    <td v-if = "selectTag('07') === shipOponent || emptyOponent" :class="getOponentClass('07')" @click = "mark('07')"></td><td v-else-if="selectTag('07') === 'hitOponent'" :class="getOponentClass('07')"></td><td v-else-if = "selectTag('07') === 'missedOponent'" :class="getOponentClass('07')"></td>
                    <td v-if = "selectTag('17') === shipOponent || emptyOponent" :class="getOponentClass('17')" @click = "mark('17')"></td><td v-else-if="selectTag('17') === 'hitOponent'" :class="getOponentClass('17')"></td><td v-else-if = "selectTag('17') === 'missedOponent'" :class="getOponentClass('17')"></td>
                    <td v-if = "selectTag('27') === shipOponent || emptyOponent" :class="getOponentClass('27')" @click = "mark('27')"></td><td v-else-if="selectTag('27') === 'hitOponent'" :class="getOponentClass('27')"></td><td v-else-if = "selectTag('27') === 'missedOponent'" :class="getOponentClass('27')"></td>
                    <td v-if = "selectTag('37') === shipOponent || emptyOponent" :class="getOponentClass('37')" @click = "mark('37')"></td><td v-else-if="selectTag('37') === 'hitOponent'" :class="getOponentClass('37')"></td><td v-else-if = "selectTag('37') === 'missedOponent'" :class="getOponentClass('37')"></td>
                    <td v-if = "selectTag('47') === shipOponent || emptyOponent" :class="getOponentClass('47')" @click = "mark('47')"></td><td v-else-if="selectTag('47') === 'hitOponent'" :class="getOponentClass('47')"></td><td v-else-if = "selectTag('47') === 'missedOponent'" :class="getOponentClass('47')"></td>
                    <td v-if = "selectTag('57') === shipOponent || emptyOponent" :class="getOponentClass('57')" @click = "mark('57')"></td><td v-else-if="selectTag('57') === 'hitOponent'" :class="getOponentClass('57')"></td><td v-else-if = "selectTag('57') === 'missedOponent'" :class="getOponentClass('57')"></td>
                    <td v-if = "selectTag('67') === shipOponent || emptyOponent" :class="getOponentClass('67')" @click = "mark('67')"></td><td v-else-if="selectTag('67') === 'hitOponent'" :class="getOponentClass('67')"></td><td v-else-if = "selectTag('67') === 'missedOponent'" :class="getOponentClass('67')"></td>
                    <td v-if = "selectTag('77') === shipOponent || emptyOponent" :class="getOponentClass('77')" @click = "mark('77')"></td><td v-else-if="selectTag('77') === 'hitOponent'" :class="getOponentClass('77')"></td><td v-else-if = "selectTag('77') === 'missedOponent'" :class="getOponentClass('77')"></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            board:{
                '00':'empty' /*Tymczasowo ustawiona klasa (dla testów). Można zmienić na 'empty'.*/, '10':'empty','20':'empty','30':'empty','40':'empty','50':'empty','60':'empty','70':'empty',
                '01':'empty', '11':'empty','21':'empty','31':'empty','41':'empty','51':'empty','61':'empty','71':'empty',
                '02':'empty', '12':'empty','22':'empty','32':'empty','42':'empty','52':'empty','62':'empty','72':'empty',
                '03':'empty', '13':'empty','23':'empty','33':'empty','43':'empty','53':'empty','63':'empty','73':'empty',
                '04':'empty', '14':'empty','24':'empty','34':'empty','44':'empty','54':'empty','64':'empty','74':'empty',
                '05':'empty', '15':'empty','25':'empty','35':'empty','45':'empty','55':'empty','65':'empty','75':'empty',
                '06':'empty', '16':'empty','26':'empty','36':'empty','46':'empty','56':'empty','66':'empty','76':'empty',
                '07':'empty', '17':'empty','27':'empty','37':'empty','47':'empty','57':'empty','67':'empty','77':'empty'
            },
            oponentBoard:{
                '00':'emptyOponent', '10': 'shipOponent', '20': 'emptyOponent', '30': 'emptyOponent', '40': 'shipOponent', '50': 'shipOponent', '60':'emptyOponent', '70': 'emptyOponent',
                '01':'emptyOponent', '11': 'emptyOponent', '21': 'emptyOponent', '31': 'emptyOponent', '41': 'emptyOponent', '51': 'emptyOponent', '61':'emptyOponent', '71': 'emptyOponent',
                '02':'emptyOponent', '12': 'shipOponent', '22': 'emptyOponent', '32': 'emptyOponent', '42': 'shipOponent', '52': 'emptyOponent', '62':'emptyOponent', '72': 'emptyOponent',
                '03':'emptyOponent', '13': 'shipOponent', '23': 'emptyOponent', '33': 'emptyOponent', '43': 'emptyOponent', '53': 'emptyOponent', '63':'emptyOponent', '73': 'emptyOponent',
                '04':'emptyOponent', '14': 'emptyOponent', '24': 'emptyOponent', '34': 'emptyOponent', '44': 'emptyOponent', '54': 'emptyOponent', '64':'emptyOponent', '74': 'emptyOponent',
                '05':'emptyOponent', '15': 'emptyOponent', '25': 'shipOponent', '35': 'emptyOponent', '45': 'shipOponent', '55': 'emptyOponent', '65':'emptyOponent', '75': 'emptyOponent',
                '06':'emptyOponent', '16': 'shipOponent', '26': 'emptyOponent', '36': 'emptyOponent', '46': 'emptyOponent', '56': 'emptyOponent', '66':'emptyOponent', '76': 'emptyOponent',
                '07':'emptyOponent', '17': 'shipOponent', '27': 'emptyOponent', '37': 'shipOponent', '47': 'emptyOponent', '57': 'shipOponent', '67':'emptyOponent', '77': 'emptyOponent'
            },
            ship: 'ship',
            shipOponent:'shipOponent',
            empty: 'empty',
            empty2: 'empty2',
            emptyOponent: 'emptyOponent',
            hit: 'hit',
            hitOponent: 'hitOponent',
            missedOponent: 'missedOponent',
            counter:12,
            clicked:[],
            oponentRecieve: [],
            setShipCounter:12,
            fourCounter:2,
            threeCounter:3,
            twoCounter:4,
            oneCounter:5,
            firstLoad: true,
            disable_animation: 'disable-animation',
            boardTable1: 'board-table1'
        }
    },
    computed:{
        board_table1(){
            if(this.firstLoad){
                return this.disable_animation;
            }
            return this.boardTable1;
        }
    },
    methods:{
        getClass(field){
            return this.board[field];
        },
        getOponentClass(field){
            return this.oponentBoard[field];
        },
        check(field){
            return !this.clicked.includes(field);
        },
        checkClicked(field){
            return this.clicked.includes(field);
        },  
        setShip(field){
            this.firstLoad = false;
            if(this.checkLocation(field) && this.checkNeighbor(field)){//} && this.checkLength(field)){
                if (!this.clicked.includes(field)){
                    this.clicked.push(field);
                    this.board[field] = this.ship;
                    console.log(this.board[field]);
                }
            }
            this.shipNumber();
        },
        unSetShip(field){
            if(this.clicked.includes(field)){
                this.setShipCounter++;
                let index = this.clicked.indexOf(field);
                this.clicked.splice(index,1);
                this.board[field] = this.empty2;
                console.log('board', this.board[field]);
                console.log('tablica', this.clicked);
            }
            this.shipNumber()
        },

        selectTag(field){
            return this.oponentBoard[field]; 
        },

        mark(field){
            this.oponentRecieve.push(field);
            if(this.oponentBoard[field] === this.shipOponent){
                this.oponentBoard[field] = this.hitOponent;
                console.log(this.oponentBoard[field]);
            }
            else if(this.oponentBoard[field] === this.emptyOponent){
                this.oponentBoard[field] = this.missedOponent;
            }
        },

        checkLocation(field){
            let isAbleToPut = true;
            let x = parseInt(field[0]);
            let y = parseInt(field[1]);
            let xTmp = x + 1;
            let yTmp = y + 1;
            let position = xTmp.toString() + yTmp.toString();
            if (this.board[position] === this.ship){
                isAbleToPut = false;
            }
            xTmp = x + 1;
            yTmp = y - 1;
            position = xTmp.toString() + yTmp.toString();
            if (this.board[position] === this.ship){
                isAbleToPut = false;
            }
            xTmp = x - 1;
            yTmp = y + 1;
            position = xTmp.toString() + yTmp.toString();
            if (this.board[position] === this.ship){
                isAbleToPut = false;
            }
            xTmp = x - 1;
            yTmp = y - 1;
            position = xTmp.toString() + yTmp.toString();
            if (this.board[position] === this.ship){
                isAbleToPut = false;
            }
            return isAbleToPut;
        
        },
        checkNeighbor(field){
            let isAbleToPut = true;
            let x = parseInt(field[0]);
            let y = parseInt(field[1]);
            let xTmp = x + 1;
            let xTmp2 = x + 2;
            let xTmp3 = x + 3;
            let xTmp4 = x + 4;
            let yTmp = y; 
            let yTmp2, yTmp3, yTmp4;
            let position = xTmp.toString() + yTmp.toString();
            let position2 = xTmp2.toString() + yTmp.toString();
            let position3 = xTmp3.toString() + yTmp.toString();
            let position4 = xTmp4.toString() + yTmp.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship) && 
                (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                    isAbleToPut = false;
            }
            xTmp = x - 1;
            xTmp2 = x - 2;
            xTmp3 = x - 3;
            xTmp4 = x - 4;
            yTmp = y;
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp2.toString() + yTmp.toString();
            position3 = xTmp3.toString() + yTmp.toString();
            position4 = xTmp4.toString() + yTmp.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship)
                && (this.board[position3] === this.ship)&& (this.board[position4] === this.ship)){
                isAbleToPut = false;
            }
            xTmp = x + 1;
            xTmp2 = x + 2;
            xTmp3 = x - 1;
            xTmp4 = x - 2;
            yTmp = y;
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp2.toString() + yTmp.toString();
            position3 = xTmp3.toString() + yTmp.toString();
            position4 = xTmp4.toString() + yTmp.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship)
                && (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                isAbleToPut = false;
            }
            xTmp = x + 1;
            xTmp2 = x - 1;
            xTmp3 = x - 2;
            xTmp4 = x - 3;
            yTmp = y;
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp2.toString() + yTmp.toString();
            position3 = xTmp3.toString() + yTmp.toString();
            position4 = xTmp4.toString() + yTmp.toString();    
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship)
                && (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                isAbleToPut = false;
            }
            xTmp = x + 1;
            xTmp2 = x + 2;
            xTmp3 = x + 3;
            xTmp4 = x - 1;
            yTmp = y;
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp2.toString() + yTmp.toString();
            position3 = xTmp3.toString() + yTmp.toString();
            position4 = xTmp4.toString() + yTmp.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship)
                && (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                isAbleToPut = false;
            }
            yTmp = y + 1;
            yTmp2 = y + 2;
            yTmp3 = y + 3;
            yTmp4 = y + 4;
            xTmp = x; 
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp.toString() + yTmp2.toString();
            position3 = xTmp.toString() + yTmp3.toString();
            position4 = xTmp.toString() + yTmp4.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship) && 
                (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                    isAbleToPut = false;
            }
            yTmp = y - 1;
            yTmp2 = y - 2;
            yTmp3 = y - 3;
            yTmp4 = y - 4;
            xTmp = x;
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp.toString() + yTmp2.toString();
            position3 = xTmp.toString() + yTmp3.toString();
            position4 = xTmp.toString() + yTmp4.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship)
                && (this.board[position3] === this.ship)&& (this.board[position4] === this.ship)){
                isAbleToPut = false;
            }
            yTmp = y + 1;
            yTmp2 = y + 2;
            yTmp3 = y - 1;
            yTmp4 = y - 2;
            xTmp = x; 
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp.toString() + yTmp2.toString();
            position3 = xTmp.toString() + yTmp3.toString();
            position4 = xTmp.toString() + yTmp4.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship) && 
                (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                    isAbleToPut = false;
            }
            xTmp = y + 1;
            yTmp2 = y - 1;
            yTmp3 = y - 2;
            yTmp4 = y - 3;
            xTmp = x;
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp.toString() + yTmp2.toString();
            position3 = xTmp.toString() + yTmp3.toString();
            position4 = xTmp.toString() + yTmp4.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship)
                && (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                isAbleToPut = false;
            }

            yTmp = y + 1;
            yTmp2 = y + 2;
            yTmp3 = y + 3;
            yTmp4 = y - 1;
            xTmp = x; 
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp.toString() + yTmp2.toString();
            position3 = xTmp.toString() + yTmp3.toString();
            position4 = xTmp.toString() + yTmp4.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship) && 
                (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                    isAbleToPut = false;
            }
            return isAbleToPut
        },
    
        shipNumber(){
            console.log('enter');
            let oneCounter = 5;
            let twoCounter = 4;
            let threeCounter = 3;
            let fourCounter = 2;
            let field, field1, field2, field3, field4, iTmp, x1, jTmp, y1, y2, y3, yLower1, yLower2, yLower3, upField;
            let counter = 0;
            for(let j = 0; j < 8; j++){
                for(let i= 0; i < 8; i++){
                    iTmp = i.toString();
                    jTmp = j.toString();
                    field = iTmp + jTmp;
                    if(this.board[field] === this.ship){
                        y1 = j - 1;
                        upField = iTmp + y1.toString();
                        if(this.board[upField] === this.ship){
                            continue;
                        }
                        y1 = j + 1;
                        y2 = j + 2;
                        y3 = j + 3;
                        yLower1 = y1.toString();
                        yLower2 = y2.toString();
                        yLower3 = y3.toString();
                        field1 = iTmp + yLower1;
                        field2 = iTmp + yLower2;
                        field3 = iTmp + yLower3;

                        if(this.board[field1] !== this.ship){
                            counter++;
                        }
                        if((this.board[field1] === this.ship) && (this.board[field2] !== this.ship)){
                            counter = 2;
                        }
                        else if((this.board[field1] === this.ship) && (this.board[field2] === this.ship) 
                            && this.board[field1] !== this.ship){
                                counter = 3;
                            }
                        else if((this.board[field1] === this.ship) && (this.board[field2] === this.ship) 
                            && (this.board[field3] === this.ship)){
                                counter = 4;
                            }
                        }
                    x1 = i + 1;
                    field4 = x1.toString() + jTmp;
                    if((this.board[field4] !== this.ship)){
                        if(counter === 1){
                            oneCounter--;
                            counter = 0;
                        }
                        else if(counter === 2){
                            twoCounter--;
                            counter = 0;
                        }
                        else if(counter === 3){
                            threeCounter--;
                            counter = 0;
                        }
                        else if(counter === 4){
                            fourCounter--;
                            counter = 0;
                        }                        
                    }
                }
            }
            this.oneCounter = oneCounter;
            this.twoCounter = twoCounter;
            this.threeCounter = threeCounter;
            this.fourCounter = fourCounter;
        }
    }
   
}
</script>

<style scoped>
.container{
    display:flex;
    justify-content: center;
}
.player1-container{
    background-color: palegreen;
    float: left;
    height: 300px;
    width: 300px;
}

.player2-container{
    background-color: darkcyan;
    height: 300px;
    width: 300px;
    margin-left: 50px;
}
.board-table1{
    border-spacing: 0px;
}
.board-table2{
    border-spacing: 0px;
}
td{
    border-style: solid;
    border-width: 0.5px;
    border-color: black;
    width: 37.5px;
    height: 37.5px;
}
img{
    width:32px;
    height:25px;
    margin-top: 2px;
}
.ship{
    background-image: url('./image/sss.png');
    background-size: cover;
    animation: show 1000ms forwards ease;
}
.empty{
    background-size: cover;
}

.empty2{
    background-size: cover;
    animation: sink 1000ms forwards ease; 
}
.emptyOponent{
    background-color: aqua;
}
.emptyOponent:hover{
    background-image: url('./image/celownik.png');
    background-size: cover;
}
.shipOponent:hover{
    background-image: url('./image/celownik.png');
    background-size: cover;
}
.shipOponent{
    size: cover;
    background-color: aqua;
}

.hit{
    background-image: url('./image/cbomb.png');
    background-size: cover;
}
/*
@keyframes sink{
    from {transform: rotateY(0); border: none;}
    80% {transform: rotateY(90deg); opacity: 100%;}
    99% {opacity: 0; transform: rotateY(90deg); background-image: url('./image/sss.png'); border: none;}
    100% {opacity: 100%; background-image: none; border: 0.5px black solid;}
}
@keyframes show{
    from {transform: rotateY(0); border: none;}
    80% {transform: rotateY(90deg); opacity: 100%;}
    99% {opacity: 0; transform: rotateY(90deg); background-color: palegreen; border: none;}
    100% {opacity: 100%; background-image: none; border: 0.5px black solid;}
}
*/

@keyframes sink {
  0% {
    opacity: 0;
    transform: rotateY(0deg); 
    background-image: url('./image/sss.png');
  }
  100% {
    opacity: 1;
    transform: rotateY(180deg);
  }
}

@keyframes show {
  0% {
    opacity: 0;
    transform: rotateY(180deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
}
.disable-animation{
    border-spacing: 0px;
}
.disable-animation td {
  animation: none !important;
  border-style: solid;
    border-width: 0.5px;
    border-color: black;
    width: 37.5px;
    height: 37.5px;
}
.hitPlayer{
    width: 37.5px;
    height: 37.5px;
    animation: sink 2000ms forwards ease;
    background-image: url('./image/sss.png');
    background-size: cover;
    display: inline-block;
    box-sizing: border-box;
    margin: 0px;
    padding:0px;
}
@keyframes explosion {
    from {transform: scale(0%); border: none;}
    70% {transform: scale(150%); border: none; opacity: 100%;}
    to {border: 0.5px black solid; opacity: 0;}
}
.hitOponent{
    animation: explosion 350ms;
    background-image: url('./image/bomb.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.missedOponent{
    animation: explosion 350ms;
    background-image: url('./image/cross.png');
    background-size: cover;
}

.counterFour .counterThree .counterTwo .counterOne{
    flex-wrap: wrap;
}
.counter4 .counter3 .counter2 .counter1{
    flex-wrap: wrap;
}

.shipImage{
    width: 37.5px;
    height: 37.5px;
    background-image: url('./image/sss.png');
    background-size: cover;
    display: inline-block;
    box-sizing: border-box;
    margin: 0px;
    padding:0px;
}
.shipCount{
    display: inline-block;
    box-sizing: border-box;
    width: 37.5px;
    height: 37.5px;
    margin: 0px;
    padding-bottom:10px;
}
</style>