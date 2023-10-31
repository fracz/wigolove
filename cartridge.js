function cartridgeCode({
                           name,
                           description,
                           zones,
                           requiredPoints,
                           hint,
                           spoilerUrl,
                           coverUrl,
                           startCoordinates,
                           finalLat,
                           finalLng,
                           zonesAlwaysVisible,
                           displayAreaRewards,
                           version,
                           author,
                           creationDate,
                           allZonesVisibleWhenFinished,
                       }, locale) {

    let zoneCode = '';
    let taskCode = '';
    let functionsCode = '';
    let mediaCode = '';
    let zoneCounter = 0;

    const pad = (num, size) => {
        const s = "000000000" + num;
        return s.substring(s.length - size);
    };

    const fakeLatSecond = (finalLat.second + (Math.floor(Math.random() * 4) - 2)) % 60;
    const fakeLngSecond = (finalLng.second + (Math.floor(Math.random() * 4) - 2)) % 60;
    const fakeLatThird = Math.floor(finalLat.third * Math.random() * 100) % 1000;
    const fakeLngThird = Math.floor(finalLng.third * Math.random() * 100) % 1000;
    let fakeCoords = `${finalLat.letter} ${finalLat.first} ${pad(fakeLatSecond, 2)}.${pad(fakeLatThird, 3)}`
    fakeCoords += ` ${finalLng.letter} ${finalLng.first} ${pad(fakeLngSecond, 2)}.${pad(fakeLngThird, 3)}`

    if (coverUrl) {
        const mediaId = crypto.randomUUID();
        mediaCode += `
objLoveCover = Wherigo.ZMedia(wigoLove)
objLoveCover.Id = "${mediaId}"
objLoveCover.Name = [[${name}]]
objLoveCover.Description = ""
objLoveCover.AltText = ""
objLoveCover.Resources = {
    {
        Type = "jpg", 
        Filename = "cover.jpg", 
        Directives = {}
    }
}
`;
    }

    if (spoilerUrl) {
        const mediaId = crypto.randomUUID();
        mediaCode += `
objLoveSpoiler = Wherigo.ZMedia(wigoLove)
objLoveSpoiler.Id = "${mediaId}"
objLoveSpoiler.Name = [[${locale.spoiler}]]
objLoveSpoiler.Description = ""
objLoveSpoiler.AltText = ""
objLoveSpoiler.Resources = {
    {
        Type = "jpg", 
        Filename = "psikus.jpg", 
        Directives = {}
    }
}
`;
    }

    for (let zone of zones) {
        zoneCounter++;

        if (zone.imageUrl) {
            const mediaId = crypto.randomUUID();
            mediaCode += `
objLoveImage${zoneCounter} = Wherigo.ZMedia(wigoLove)
objLoveImage${zoneCounter}.Id = "${mediaId}"
objLoveImage${zoneCounter}.Name = "${zone.name}"
objLoveImage${zoneCounter}.Description = ""
objLoveImage${zoneCounter}.AltText = ""
objLoveImage${zoneCounter}.Resources = {
    {
        Type = "jpg", 
        Filename = "${zone.id}.jpg", 
        Directives = {}
    }
}
`;
        }

        const zonePoints = zone.area.map(({lat, lng}) => `ZonePoint(${lat}, ${lng}, 0)`);
        const taskId = crypto.randomUUID();
        zoneCode += `
objLoveZone${zoneCounter} = Wherigo.Zone(wigoLove)
objLoveZone${zoneCounter}.Id = "${zone.id}"
objLoveZone${zoneCounter}.Name = [[${zone.name}]]
objLoveZone${zoneCounter}.Description = [[${zone.description}
]]..[[${displayAreaRewards ? locale.worthPoints.replace('%', zone.points) : ''}]]
objLoveZone${zoneCounter}.Visible = ${zonesAlwaysVisible ? 'true' : 'false'}
objLoveZone${zoneCounter}.Commands = {}
objLoveZone${zoneCounter}.DistanceRange = Distance(-1, "feet")
objLoveZone${zoneCounter}.ShowObjects = "OnEnter"
objLoveZone${zoneCounter}.ProximityRange = Distance(60, "meters")
objLoveZone${zoneCounter}.AllowSetPositionTo = false
objLoveZone${zoneCounter}.Active = true
${zone.imageUrl ? `objLoveZone${zoneCounter}.Media = objLoveImage${zoneCounter}` : ''}
objLoveZone${zoneCounter}.Points = {
    ${zonePoints.join(', ')}
}
objLoveZone${zoneCounter}.OriginalPoint = ${zonePoints[0]}
objLoveZone${zoneCounter}.DistanceRangeUOM = "Feet"
objLoveZone${zoneCounter}.ProximityRangeUOM = "Meters"
objLoveZone${zoneCounter}.OutOfRangeName = ""
objLoveZone${zoneCounter}.InRangeName = ""
`;
        taskCode += `
objLoveTask${zoneCounter} = Wherigo.ZTask(wigoLove)
objLoveTask${zoneCounter}.Id = "${taskId}"
objLoveTask${zoneCounter}.Name = [[${zone.name}${displayAreaRewards ? ` (+${zone.points})` : ''}]]
objLoveTask${zoneCounter}.Description = [[${zone.description}
]]..[[${displayAreaRewards ? locale.worthPoints.replace('%', zone.points) : ''}]]
objLoveTask${zoneCounter}.Visible = false
${zone.imageUrl ? `objLoveTask${zoneCounter}.Media = objLoveImage${zoneCounter}` : ''}
objLoveTask${zoneCounter}.Active = true
objLoveTask${zoneCounter}.Complete = false
objLoveTask${zoneCounter}.CorrectState = "None"
`;
        functionsCode += `
function objLoveZone${zoneCounter}:OnEnter()
    currentZone = "objLoveZone${zoneCounter}"
    if objLoveTask${zoneCounter}.Complete == false then
        objLoveTask${zoneCounter}.Visible = true
        objLoveTask${zoneCounter}.Complete = true
        objLoveZone${zoneCounter}.Visible = true
        wigoLove.RequestSync()
        _Urwigo.MessageBox{
            Text = [[${zone.name}
]]..[[${zone.description}
]]..[[${displayAreaRewards ? locale.worthPoints.replace('%', zone.points) : ''}]], 
            ${zone.imageUrl ? `Media = objLoveImage${zoneCounter},` : ''}
            Callback = function(action)
                if action ~= nil then
                    objPamatky = objPamatky + -${zone.points}
                    if objPamatky <= 0 then
                        objFinito()
                    else
                        _Urwigo.MessageBox{
                            Text = [[${displayAreaRewards ? locale.worthPoints.replace('%', zone.points) : ''}
]]..[[${locale.howManyLeftContent.split('%')[0]}]]..objPamatky..[[${locale.howManyLeftContent.split('%')[1]}]], 
                            ${coverUrl ? 'Media = objLoveCover,' : ''} 
                            Callback = function(action)
                                if action ~= nil then
                                    Wherigo.ShowScreen(Wherigo.MAINSCREEN)
                                end
                                wigoLove.RequestSync()
                            end
                        }
                    end
                end
            end
        }
    end
end
`;
    }

    const finalDescription = `[[${locale.finalContent.split('%')[0]}]].."${finalLat.letter} ${finalLat.first}° "..string.format("%02d",math.floor(dontSteal/12)).."."..string.format("%03d",math.floor(goAndHaveFun/9)).."' ${finalLng.letter} ${finalLng.first}° "..string.format("%02d",math.floor(afterallItsAboutYouNotMe/42)).."."..string.format("%03d",math.floor(cheater+100)).."'"..[[${locale.finalContent.split('%')[1]}]]..[[${hint ? locale.hint + ': ' + hint : ''}]]`;
    const finalDescriptionFake = `[[${locale.finalContent.split('%')[0]}]]..[[${fakeCoords}]]..[[${locale.finalContent.split('%')[1]}]]`;

    return `require "Wherigo"
ZonePoint = Wherigo.ZonePoint
Distance = Wherigo.Distance
Player = Wherigo.Player

-- String decode --
function _cqRka(str)
    local res = ""
    local dtable = "\\103\\015\\099\\022\\112\\118\\077\\104\\023\\034\\090\\108\\086\\021\\109\\065\\011\\037\\106\\008\\012\\089\\073\\085\\050\\100\\002\\124\\070\\048\\019\\110\\122\\082\\105\\064\\088\\071\\066\\054\\009\\035\\038\\102\\003\\036\\051\\095\\072\\123\\010\\116\\056\\018\\101\\114\\113\\057\\061\\125\\031\\094\\087\\093\\004\\025\\083\\097\\039\\049\\016\\084\\062\\115\\028\\117\\081\\075\\026\\060\\052\\107\\005\\043\\096\\047\\027\\059\\033\\092\\001\\032\\053\\030\\098\\045\\040\\068\\044\\055\\078\\121\\074\\042\\020\\014\\126\\013\\006\\069\\058\\091\\111\\041\\000\\063\\076\\046\\024\\079\\080\\029\\120\\067\\007\\119\\017"
    for i=1, #str do
        local b = str:byte(i)
        if b > 0 and b <= 0x7F then
            res = res .. string.char(dtable:byte(b))
        else
            res = res .. string.char(b)
        end
    end
    return res
end

-- Internal functions --
require "table"
require "math"

math.randomseed(os.time())
math.random()
math.random()
math.random()

_Urwigo = {}

_Urwigo.InlineRequireLoaded = {}
_Urwigo.InlineRequireRes = {}
_Urwigo.InlineRequire = function(moduleName)
  local res
  if _Urwigo.InlineRequireLoaded[moduleName] == nil then
    res = _Urwigo.InlineModuleFunc[moduleName]()
    _Urwigo.InlineRequireLoaded[moduleName] = 1
    _Urwigo.InlineRequireRes[moduleName] = res
  else
    res = _Urwigo.InlineRequireRes[moduleName]
  end
  return res
end

_Urwigo.Round = function(num, idp)
  local mult = 10^(idp or 0)
  return math.floor(num * mult + 0.5) / mult
end

_Urwigo.Ceil = function(num, idp)
  local mult = 10^(idp or 0)
  return math.ceil(num * mult) / mult
end

_Urwigo.Floor = function(num, idp)
  local mult = 10^(idp or 0)
  return math.floor(num * mult) / mult
end

_Urwigo.DialogQueue = {}
_Urwigo.RunDialogs = function(callback)
    local dialogs = _Urwigo.DialogQueue
    local lastCallback = nil
    _Urwigo.DialogQueue = {}
    local msgcb = {}
    msgcb = function(action)
        if action ~= nil then
            if lastCallback ~= nil then
                lastCallback(action)
            end
            local entry = table.remove(dialogs, 1)
            if entry ~= nil then
                lastCallback = entry.Callback;
                if entry.Text ~= nil then
                    Wherigo.MessageBox({Text = entry.Text, Media=entry.Media, Buttons=entry.Buttons, Callback=msgcb})
                else
                    msgcb(action)
                end
            else
                if callback ~= nil then
                    callback()
                end
            end
        end
    end
    msgcb(true) -- any non-null argument
end

_Urwigo.MessageBox = function(tbl)
    _Urwigo.RunDialogs(function() Wherigo.MessageBox(tbl) end)
end

_Urwigo.OldDialog = function(tbl)
    _Urwigo.RunDialogs(function() Wherigo.Dialog(tbl) end)
end

_Urwigo.Dialog = function(buffered, tbl, callback)
    for k,v in ipairs(tbl) do
        table.insert(_Urwigo.DialogQueue, v)
    end
    if callback ~= nil then
        table.insert(_Urwigo.DialogQueue, {Callback=callback})
    end
    if not buffered then
        _Urwigo.RunDialogs(nil)
    end
end

_Urwigo.Hash = function(str)
   local b = 378551;
   local a = 63689;
   local hash = 0;
   for i = 1, #str, 1 do
      hash = hash*a+string.byte(str,i);
      hash = math.fmod(hash, 65535)
      a = a*b;
      a = math.fmod(a, 65535)
   end
   return hash;
end

_Urwigo.DaysInMonth = {
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
}

_Urwigo_Date_IsLeapYear = function(year)
    if year % 400 == 0 then
        return true
    elseif year% 100 == 0 then
        return false
    elseif year % 4 == 0 then
        return true
    else
        return false
    end
end

_Urwigo.Date_DaysInMonth = function(year, month)
    if month ~= 2 then
        return _Urwigo.DaysInMonth[month];
    else
        if _Urwigo_Date_IsLeapYear(year) then
            return 29
        else
            return 28
        end
    end
end

_Urwigo.Date_DayInYear = function(t)
    local res = t.day
    for month = 1, t.month - 1 do
        res = res + _Urwigo.Date_DaysInMonth(t.year, month)
    end
    return res
end
goAndHaveFun = ${finalLat.third * 9}
_Urwigo.Date_HourInWeek = function(t)
    return t.hour + (t.wday-1) * 24
end

_Urwigo.Date_HourInMonth = function(t)
    return t.hour + t.day * 24
end

_Urwigo.Date_HourInYear = function(t)
    return t.hour + (_Urwigo.Date_DayInYear(t) - 1) * 24
end

_Urwigo.Date_MinuteInDay = function(t)
    return t.min + t.hour * 60
end

_Urwigo.Date_MinuteInWeek = function(t)
    return t.min + t.hour * 60 + (t.wday-1) * 1440;
end

_Urwigo.Date_MinuteInMonth = function(t)
    return t.min + t.hour * 60 + (t.day-1) * 1440;
end

_Urwigo.Date_MinuteInYear = function(t)
    return t.min + t.hour * 60 + (_Urwigo.Date_DayInYear(t) - 1) * 1440;
end

_Urwigo.Date_SecondInHour = function(t)
    return t.sec + t.min * 60
end

_Urwigo.Date_SecondInDay = function(t)
    return t.sec + t.min * 60 + t.hour * 3600
end
dontSteal = ${finalLat.second * 12}

_Urwigo.Date_SecondInWeek = function(t)
    return t.sec + t.min * 60 + t.hour * 3600 + (t.wday-1) * 86400
end

_Urwigo.Date_SecondInMonth = function(t)
    return t.sec + t.min * 60 + t.hour * 3600 + (t.day-1) * 86400
end

_Urwigo.Date_SecondInYear = function(t)
    return t.sec + t.min * 60 + t.hour * 3600 + (_Urwigo.Date_DayInYear(t)-1) * 86400
end


-- Inlined modules --
_Urwigo.InlineModuleFunc = {}

wigoLove = Wherigo.ZCartridge()

FINAL_DESCRIPTION = ${finalDescriptionFake}

-- Media --

${mediaCode}

-- Cartridge Info --
wigoLove.Id="963692b6-8f1a-447b-ae71-649836ead48f"
wigoLove.Name="${name}"
wigoLove.Description=[[${description}]]
wigoLove.Visible=true
wigoLove.Activity="TourGuide"
wigoLove.StartingLocationDescription=[[${description}]]
wigoLove.StartingLocation = ZonePoint(${startCoordinates.lat},${startCoordinates.lng},0)
wigoLove.Version="ver. ${version}"
wigoLove.Company=""
wigoLove.Author="${author}"
wigoLove.BuilderVersion="wigoLove 1.0 by kranfagel"
wigoLove.CreateDate="${creationDate}"
wigoLove.PublishDate="1/1/0001 12:00:00 AM"
wigoLove.UpdateDate="${new Date().toLocaleString("en-US").replace(',', '')}"
wigoLove.LastPlayedDate="1/1/0001 12:00:00 AM"
wigoLove.TargetDevice="PocketPC"
wigoLove.TargetDeviceVersion="0"
wigoLove.StateId="1"
wigoLove.CountryId="2"
wigoLove.Complete=false
wigoLove.UseLogging=true
afterallItsAboutYouNotMe = ${finalLng.second * 42}
cheater = ${finalLng.third - 100}

${coverUrl ? 'wigoLove.Media=objLoveCover' : ''}
${coverUrl ? 'wigoLove.Icon=objLoveCover' : ''}


-- Zones --
${zoneCode}
xcdKranfeg=${finalDescription}


-- Items --
objHowManyLeft = Wherigo.ZItem{
    Cartridge = wigoLove, 
    Container = Player
}
objHowManyLeft.Id = "accb593c-d43b-46d7-853b-9d7112bc36e1"
objHowManyLeft.Name = [[${locale.howManyLeftTitle}]]
objHowManyLeft.Description = ""
objHowManyLeft.Visible = true
objHowManyLeft.Icon = obj
objHowManyLeft.Commands = {}
objHowManyLeft.ObjectLocation = Wherigo.INVALID_ZONEPOINT
objHowManyLeft.Locked = false
objHowManyLeft.Opened = false

objFotohint = Wherigo.ZItem(wigoLove)
objFotohint.Id = "47b8b44c-db97-4116-a743-cc129c7427ff"
objFotohint.Name = [[${locale.finalTitle}]]
objFotohint.Description = xcdKranfeg
objFotohint.Visible = true
${spoilerUrl ? 'objFotohint.Media = objLoveSpoiler' : ''}
${spoilerUrl ? 'objFotohint.Icon = objLoveSpoiler' : ''}
objFotohint.Commands = {}
objFotohint.ObjectLocation = Wherigo.INVALID_ZONEPOINT
objFotohint.Locked = false
objFotohint.Opened = false
objZivoty = Wherigo.ZItem{
    Cartridge = wigoLove, 
    Container = Player
}
objZivoty.Id = "04f7dbc8-7e62-417a-8d8b-617a5685a25b"
objZivoty.Name = "Zivoty"
objZivoty.Description = ""
objZivoty.Visible = false
objZivoty.Icon = objsrdicko
objZivoty.Commands = {}
objZivoty.ObjectLocation = Wherigo.INVALID_ZONEPOINT
objZivoty.Locked = false
objZivoty.Opened = false

objTester = Wherigo.ZItem{
    Cartridge = wigoLove, 
    Container = Player
}
objTester.Id = "4b247564-9007-4a78-9fec-b4efa9957a6d"
objTester.Name = [[Tester]]
objTester.Description = ""
objTester.Visible = false
objTester.ObjectLocation = Wherigo.INVALID_ZONEPOINT
objTester.Locked = false
objTester.Opened = false

objCompletion = Wherigo.ZItem{
    Cartridge = wigoLove, 
    Container = Player
}
objCompletion.Id = "76a53b31-e5f6-425d-8ed6-88082750cd84"
objCompletion.Name = [[${locale.completionCodeTitle}]]
objCompletion.Description = [[]]
objCompletion.Visible = false
objCompletion.ObjectLocation = Wherigo.INVALID_ZONEPOINT
objCompletion.Locked = false
objCompletion.Opened = false

-- Tasks --
${taskCode}

-- Cartridge Variables --
-- objPamatky = 15
objPamatky = ${requiredPoints}
objzivoty = 3
objdead = true
currentZone = "objLoveZone1"
currentCharacter = "dummy"
currentItem = "objHowManyLeft"
--currentTask = "objLoveTask1"
-- currentInput = "objDulHlubina2"
currentTimer = "dummy"
wigoLove.ZVariables = {
    objPamatky = ${requiredPoints}, 
    objzivoty = 3, 
    objdead = true, 
    currentZone = "objLoveZone1", 
    currentCharacter = "dummy", 
    currentItem = "objHowManyLeft", 
--    currentTask = "objLoveTask1", 
--    currentInput = "objDulHlubina2", 
    currentTimer = "dummy"
}

-- functions --
function wigoLove:OnStart()
    if (_G[_cqRka("\\110\\032\\006")][_cqRka("\\098\\055\\006\\035\\003\\055\\023\\098")] == _cqRka("\\098\\055\\074\\082\\052\\113\\005")) or (_G[_cqRka("\\110\\032\\006")][_cqRka("\\121\\012\\068\\052\\044\\113\\056\\015")] == _cqRka("\\063\\035\\032\\047\\025")) then
        for k, v in pairs(_G[_cqRka("\\113\\095\\019\\023\\012\\113\\006\\055\\120\\067\\072\\034\\016\\013\\016")][_cqRka("\\016\\012\\012\\011\\120\\095\\019\\055\\003\\052\\074")]) do
            v[_cqRka("\\013\\035\\074\\035\\095\\012\\055")] = false
            v[_cqRka("\\016\\003\\052\\035\\006\\055")] = false
        end
        _Urwigo.MessageBox{
            Text = tostring(_cqRka("\\101\\055\\005\\113\\026\\006\\068\\026\\055\\019\\089")), 
            Callback = function(action)
                if action ~= nil then
                    _G[_cqRka("\\063\\008\\055\\056\\035\\001\\113")][_cqRka("\\124\\113\\015\\015\\068\\032\\026")](_cqRka("\\067\\068\\006\\055\\124\\012\\113\\074\\055"))
                end
            end
        }
        return
    end
    _Urwigo.MessageBox{
        Text = [[${locale.welcome.split('%')[0]}]]..Player.Name..[[${locale.welcome.split('%')[1]}]]..[[

${description}]]
    }
end
function wigoLove:OnRestore()
end

function MakeAllZonesVisible()
  for k,z in ipairs(wigoLove.AllZObjects) do
    if Wherigo.NoCaseEquals(tostring(z), "a Zone instance") then
        z.Visible = true
    end
  end
end

${functionsCode}


function objHowManyLeft:OnClick()
    _Urwigo.MessageBox{
        Text = [[${locale.howManyLeftContent.split('%')[0]}]]..objPamatky..[[${locale.howManyLeftContent.split('%')[1]}]], 
        ${coverUrl ? 'Media = objLoveCover,' : ''} 
        Callback = function(action)
            if action ~= nil then
                Wherigo.ShowScreen(Wherigo.MAINSCREEN)
            end
        end
    }
end

function objCompletion:OnClick()
    _Urwigo.MessageBox{
        Text = [[${locale.completionCodeContent} ]]..string.sub(Player.CompletionCode, 1, 15), 
        ${coverUrl ? 'Media = objLoveCover,' : ''} 
        Callback = function(action)
            if action ~= nil then
                Wherigo.ShowScreen(Wherigo.MAINSCREEN)
            end
        end
    }
end

function objTester:OnClick()
    MakeAllZonesVisible()
end

function objFotohint:OnClick()
    _Urwigo.MessageBox{
        Text = xcdKranfeg,
        ${spoilerUrl ? 'Media = objLoveSpoiler,' : ''} 
        Callback = function(action)
            if action ~= nil then
                Wherigo.ShowScreen(Wherigo.MAINSCREEN)
            end
        end
    }
end
function objZivoty:OnClick()
    _Urwigo.MessageBox{
        Text = "Pocet zbyvajicich zivotu: "..objzivoty, 
        Callback = function(action)
            if action ~= nil then
                Wherigo.ShowScreen(Wherigo.INVENTORYSCREEN)
            end
        end
    }
end

-- Urwigo functions --
function objFinito()
    if objdead == false then
        _Urwigo.MessageBox{
            Text = "Bohuzel jsi ztratil vsechny zivoty a na finalku nemas narok. Promin. Varovan jsi byl...", 
            Callback = function(action)
                if action ~= nil then
                    Wherigo.Command "SaveClose"
                end
            end
        }
    else
        objFotohint:MoveTo(Player)
        objHowManyLeft.Visible = false
        objCompletion.Visible = true
        wigoLove.Complete = true
        ${allZonesVisibleWhenFinished ? 'MakeAllZonesVisible()' : ''}
        _Urwigo.MessageBox{
            Text = [[${locale.finalSuccessMessage}]], 
            Callback = function(action)
                if action ~= nil then
                    objFotohint:OnClick()
                end
            end
        }
    end
end
function objdead1()
    objdead = false
    wigoLove:RequestSync()
    _Urwigo.MessageBox{
        Text = [[Prisel jsi o vsechny zivoty. Hra se neukonci, muzes pamatky hledat dale, ale k finalce uz se nedostanes. Muzes si zapnout novou hru.
Diky, zes to alespon zkusil.]], 
        Callback = function(action)
            if action ~= nil then
                Wherigo.Command "SaveClose"
            end
        end
    }
end

-- Begin user functions --
-- End user functions --
return wigoLove`;
}
