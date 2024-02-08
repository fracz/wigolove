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
                           defaultLocale,
                       }) {

    let zoneCode = '';
    let taskCode = '';
    let functionsCode = '';
    let mediaCode = '';
    let zoneCounter = 0;
    let i18nCode = [
        'wigoLove.Name=i18n("nameSlugified")',
        'wigoLove.Description=i18n("descriptionSlugified")',
        'wigoLove.StartingLocationDescription=i18n("description")',
        'objHowManyLeft.Name = i18n("howManyLeftTitle")',
        'objFotohint.Name = i18n("finalTitle")',
        'objDescription.Name = i18n("descriptionTitle")',
        'objDescription.Description = i18n("description")',
            'objCompletion.Name = i18n("completionCodeTitle")',
    ];
    let variablesCode = ["dummyVariable = 0"];
    let latOffsetCode = '0';
    let lngOffsetCode = '0';
    let latOffset = 0;
    let lngOffset = 0;
    const availableLangs = [defaultLocale];
    Object.entries(name).forEach(v => {
        if (name[v[0]] && !availableLangs.includes(v[0])) {
            availableLangs.push(v[0]);
        }
    })
    const i18n = {};
    availableLangs.forEach(l => i18n[l] = {
        name: name[l],
        nameSlugified: slugify(name[l], {replacement: ' ', remove: /`/g}),
        description: description[l],
        descriptionSlugified: slugify(description[l], {replacement: ' ', remove: /`/g}),
        hint: hint[l],
        ...locale[l],
    });

    const pad = (num, size) => {
        const s = "000000000" + num;
        return s.substring(s.length - size);
    };

    const fakeLatSecond = (finalLat.second + (Math.floor(Math.random() * 4) - 2)) % 60;
    const fakeLngSecond = (finalLng.second + (Math.floor(Math.random() * 4) - 2)) % 60;
    const fakeLatThird = Math.floor(finalLat.third * Math.random() * 100) % 1000;
    const fakeLngThird = Math.floor(finalLng.third * Math.random() * 100) % 1000;
    const fakeFinalOffset = Math.random() - 0.5;
    let fakeCoords = `${finalLat.letter} ${finalLat.first} ${pad(fakeLatSecond, 2)}.${pad(fakeLatThird, 3)}`
    fakeCoords += ` ${finalLng.letter} ${finalLng.first} ${pad(fakeLngSecond, 2)}.${pad(fakeLngThird, 3)}`

    mediaCode += `
objLoveLanguageIcon = Wherigo.ZMedia(wigoLove)
objLoveLanguageIcon.Id = "1c23f33a-c2ff-4c14-838a-79f7c5399eec"
objLoveLanguageIcon.Description = ""
objLoveLanguageIcon.AltText = ""
objLoveLanguageIcon.Resources = {
    {
        Type = "jpg", 
        Filename = "language.jpg", 
        Directives = {}
    }
}
objLoveQuestionIcon = Wherigo.ZMedia(wigoLove)
objLoveQuestionIcon.Id = "b847bd1f-b915-4076-9bf5-d29bf1807e26"
objLoveQuestionIcon.Description = ""
objLoveQuestionIcon.AltText = ""
objLoveQuestionIcon.Resources = {
    {
        Type = "jpg", 
        Filename = "question.jpg", 
        Directives = {}
    }
}
`;

    if (coverUrl) {
        const mediaId = crypto.randomUUID();
        i18nCode.push('objLoveCover.Name = i18n("name")')
        mediaCode += `
objLoveCover = Wherigo.ZMedia(wigoLove)
objLoveCover.Id = "${mediaId}"
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
        i18nCode.push('objLoveSpoiler.Name = i18n("spoiler")')
        mediaCode += `
objLoveSpoiler = Wherigo.ZMedia(wigoLove)
objLoveSpoiler.Id = "${mediaId}"
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

        availableLangs.forEach(l => i18n[l][`zone${zoneCounter}Name`] = zone.name[l]);
        availableLangs.forEach(l => i18n[l][`zone${zoneCounter}Description`] = zone.description[l]);
        i18nCode.push(`objLoveZone${zoneCounter}.Name = i18n("zone${zoneCounter}Name")`);
        i18nCode.push(`objLoveZone${zoneCounter}.Description = i18n("zone${zoneCounter}Description")..${displayAreaRewards ? `i18n("worthPoints", ${zone.points})` : '""'}`);

        if (zone.imageUrl) {
            i18nCode.push(`objLoveImage${zoneCounter}.Name = i18n("zone${zoneCounter}Name")`);
            const mediaId = crypto.randomUUID();
            mediaCode += `
objLoveImage${zoneCounter} = Wherigo.ZMedia(wigoLove)
objLoveImage${zoneCounter}.Id = "${mediaId}"
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
        availableLangs.forEach(l => i18n[l][`zone${zoneCounter}Name`] = zone.name[l]);
        availableLangs.forEach(l => i18n[l][`zone${zoneCounter}Description`] = zone.description[l]);
        i18nCode.push(`objLoveTask${zoneCounter}.Name = i18n("zone${zoneCounter}Name")..[[${displayAreaRewards ? ` (+${zone.points})` : ''}]].."${zone.useToCalculateCoords ? '*' : ''}"`);
        i18nCode.push(`objLoveTask${zoneCounter}.Description = i18n("zone${zoneCounter}Description")..${displayAreaRewards ? `i18n("worthPoints", ${zone.points})` : '""'}`);
        taskCode += `
objLoveTask${zoneCounter} = Wherigo.ZTask(wigoLove)
objLoveTask${zoneCounter}.Id = "${taskId}"
objLoveTask${zoneCounter}.Visible = false
${zone.imageUrl ? `objLoveTask${zoneCounter}.Media = objLoveImage${zoneCounter}` : ''}
objLoveTask${zoneCounter}.Active = true
objLoveTask${zoneCounter}.Complete = false
objLoveTask${zoneCounter}.CorrectState = "None"
`;
        const decrementCode = `
                objPamatky = objPamatky - ${zone.points}
                if objPamatky <= 0 then
                    objPamatky = 0
                end
                wigoLove.RequestSync()
                if objPamatky <= 0 then
                    objFinito()
                else
                    _Urwigo.MessageBox{
                        Text = ${displayAreaRewards ? `i18n("worthPoints", ${zone.points})` : '""'}..i18n("howManyLeftContent", objPamatky), 
                        ${coverUrl ? 'Media = objLoveCover,' : ''} 
                        Callback = function(action)
                           Wherigo.ShowScreen(Wherigo.MAINSCREEN)
                        end
                    }
                end
        `;

        const callbackCode = zone.hasQuestion ? `Wherigo.GetInput(zinput${zoneCounter})` : decrementCode;

        functionsCode += `
function objLoveZone${zoneCounter}:OnEnter()
    currentZone = "objLoveZone${zoneCounter}"
    if objLoveTask${zoneCounter}.Visible == false then
        objLoveTask${zoneCounter}.Visible = true
        objLoveZone${zoneCounter}.Visible = true
        ${zone.hasQuestion ? '' : `objLoveTask${zoneCounter}.Complete = true`}
        wigoLove.RequestSync()
        _Urwigo.MessageBox{
            Text = i18n("zone${zoneCounter}Name") .. [[
]]..i18n("zone${zoneCounter}Description")..[[
]]..${displayAreaRewards ? `i18n("worthPoints", ${zone.points})` : '""'}, 
            ${zone.imageUrl ? `Media = objLoveImage${zoneCounter},` : ''}
            Callback = function(action)
                ${callbackCode}
            end
        }
    end
end
`;
        if (zone.hasQuestion) {
            availableLangs.forEach(l => i18n[l][`zone${zoneCounter}Question`] = zone.question[l]);
            i18nCode.push(`zinput${zoneCounter}.Name=i18n("questionTitle")`);
            i18nCode.push(`zinput${zoneCounter}.Text=i18n("zone${zoneCounter}Question")`);
            variablesCode.push(`objAnswer${zoneCounter} = 0`);
            zoneCode += `
zinput${zoneCounter} = Wherigo.ZInput(wigoLove)
zinput${zoneCounter}.Id="${crypto.randomUUID()}"
zinput${zoneCounter}.Description=[[]]
zinput${zoneCounter}.Visible=true
zinput${zoneCounter}.InputType="Text"
`;
            if (zone.useToCalculateCoords) {
                const latOffsetMult = Math.ceil(Math.random() * 5);
                latOffset += +zone.validAnswer * latOffsetMult;
                latOffsetCode += ` + ${latOffsetMult} * objAnswer${zoneCounter}`;
                const lngOffsetMult = Math.ceil(Math.random() * 5);
                lngOffset += +zone.validAnswer * lngOffsetMult;
                lngOffsetCode += ` + ${lngOffsetMult} * objAnswer${zoneCounter}`;

                zoneCode += `
function zinput${zoneCounter}:OnGetInput(input)
    input = tonumber(input)
    if input == nil then
        return
    end
    objAnswer${zoneCounter} = input
    if not objLoveTask${zoneCounter}.Complete then
        objLoveTask${zoneCounter}.Complete = true
        _Urwigo.MessageBox{
            Text = i18n("answerNoValidation", i18n("zone${zoneCounter}Name")),
            Callback = function(action)
                ${decrementCode}
            end
        }
    else
        wigoLove.RequestSync()
    end
end                 
`;
            } else {
                zoneCode += `
function zinput${zoneCounter}:OnGetInput(input)
    if input == nil or Wherigo.NoCaseEquals(input,"") or objLoveTask${zoneCounter}.Complete then
        return
    end
    if Wherigo.NoCaseEquals(input,"${zone.validAnswer}") then
        objLoveTask${zoneCounter}.Complete = true
        _Urwigo.MessageBox{
            Text = i18n("correctAnswerMessage"),
            Callback = function(action)
                ${decrementCode}
            end
        }
    else
        _Urwigo.MessageBox{
            Text = i18n("invalidAnswerMessage"),
            Callback = function(action)
                Wherigo.GetInput(zinput${zoneCounter})
            end
        }
    end
end                
`;
            }
            taskCode += `
function objLoveTask${zoneCounter}:OnClick()
    if not objLoveTask${zoneCounter}.Complete or ${zone.useToCalculateCoords ? 'true' : 'false'} then
        if objLoveTask${zoneCounter}.Complete then
            zinput${zoneCounter}.Text = i18n("zone${zoneCounter}Question") .. [[
]] .. i18n("yourPreviousAnswerIs", objAnswer${zoneCounter})
        end
        _Urwigo.RunDialogs(function()
            Wherigo.GetInput(zinput${zoneCounter})
        end)
    end
end
`;
        }
    }

    const finalDescription = `i18n("finalContent", "${finalLat.letter} ${finalLat.first}° "..string.format("%02d",math.floor(dontSteal/12)).."."..string.format("%03d",math.fmod(goAndHaveFun-123+${latOffsetCode}, 1000)).."' ${finalLng.letter} ${finalLng.first}° "..string.format("%02d",math.floor(afterallItsAboutYouNotMe/42)).."."..string.format("%03d",math.fmod(cheater+100+${lngOffsetCode},1000)).."'")..${hint ? `i18n("hintTitle") .. ": " .. i18n("hint")` : '""'}..${latOffset ? 'i18n("coordinatesCalculationWarning")' : '""'}`;
    const finalDescriptionFake = `"${fakeCoords}"`;

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
goAndHaveFun = ${finalLat.third + 123 - latOffset}
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

_Urwigo.InlineModuleFunc = {}

wigoLove = Wherigo.ZCartridge()

FINAL_COORDS = ${finalDescriptionFake}

-- Media --

${mediaCode}

-- Cartridge Info --
wigoLove.Id="963692b6-8f1a-447b-ae71-649836ead48f"
wigoLove.Visible=true
wigoLove.Activity="TourGuide"
wigoLove.StartingLocation = ZonePoint(${startCoordinates.lat},${startCoordinates.lng},0)
wigoLove.Version="ver. ${version}"
wigoLove.Company=""
wigoLove.Author="${author}"
wigoLove.BuilderVersion="wigoLove${VERSION ? ' v' + VERSION : ''} by kranfagel"
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
cheater = ${finalLng.third - 100 - lngOffset}

${coverUrl ? 'wigoLove.Media=objLoveCover' : ''}
${coverUrl ? 'wigoLove.Icon=objLoveCover' : ''}


-- Zones --
${zoneCode}

objLoveZoneFinish = Wherigo.Zone(wigoLove)
objLoveZoneFinish.Id = "ec6f16d3-4d67-4ab9-92ea-6c96452547c8"
objLoveZoneFinish.Name = [[Final]]
objLoveZoneFinish.Description = [[Final geocache is here. Good luck!
]]..[[]]
objLoveZoneFinish.Visible = false
objLoveZoneFinish.Commands = {}
objLoveZoneFinish.DistanceRange = Distance(-1, "feet")
objLoveZoneFinish.ShowObjects = "OnEnter"
objLoveZoneFinish.ProximityRange = Distance(60, "meters")
objLoveZoneFinish.AllowSetPositionTo = false
objLoveZoneFinish.Active = false
objLoveZoneFinish.Points = {
    ZonePoint(${startCoordinates.lat + fakeFinalOffset}, ${startCoordinates.lng + fakeFinalOffset}, 0),
    ZonePoint(${startCoordinates.lat + fakeFinalOffset + 0.00000001}, ${startCoordinates.lng + fakeFinalOffset + 0.00000001}, 0),
    ZonePoint(${startCoordinates.lat + fakeFinalOffset - 0.00000001}, ${startCoordinates.lng + fakeFinalOffset + 0.00000001}, 0)
}
objLoveZoneFinish.OriginalPoint = ZonePoint(50.05334182188759, 19.84133129298305, 0)
objLoveZoneFinish.DistanceRangeUOM = "Feet"
objLoveZoneFinish.ProximityRangeUOM = "Meters"
objLoveZoneFinish.OutOfRangeName = ""
objLoveZoneFinish.InRangeName = ""

-- Items --
objHowManyLeft = Wherigo.ZItem{
    Cartridge = wigoLove, 
    Container = Player
}
objHowManyLeft.Id = "accb593c-d43b-46d7-853b-9d7112bc36e1"
objHowManyLeft.Description = ""
objHowManyLeft.Visible = true
objHowManyLeft.Commands = {}
objHowManyLeft.ObjectLocation = Wherigo.INVALID_ZONEPOINT
objHowManyLeft.Locked = false
objHowManyLeft.Opened = false
objHowManyLeft.Icon = objLoveQuestionIcon

objLang = Wherigo.ZItem{
    Cartridge = wigoLove, 
    Container = Player
}
objLang.Id = "4e562a11-58c1-4455-877c-d921f34fceeb"
objLang.Name="Language / Język"
objLang.Description = ""
objLang.Visible = ${availableLangs.length > 1 ? 'true' : 'false'}
objLang.Commands = {}
objLang.ObjectLocation = Wherigo.INVALID_ZONEPOINT
objLang.Locked = false
objLang.Opened = false
objLang.Icon=objLoveLanguageIcon

zinputLang = Wherigo.ZInput(wigoLove)
zinputLang.Id="d5150c7c-5322-4cff-bf52-5023db81839b"
zinputLang.Name="Language / Język"
zinputLang.Text=[[Choose the language / Wybierz język]]
zinputLang.Description=[[]]
zinputLang.Visible=${availableLangs.length > 1 ? 'true' : 'false'}
zinputLang.InputType="MultipleChoice"
zinputLang.Choices = {${availableLangs.map(l => `"${l}"`).join(',')}}


objDescription = Wherigo.ZItem{
    Cartridge = wigoLove, 
    Container = Player
}
objDescription.Id = "416c01d5-a102-4916-9cbf-3cf464594b4a"
objDescription.Visible = true
objDescription.Icon = obj
objDescription.Commands = {}
objDescription.ObjectLocation = Wherigo.INVALID_ZONEPOINT
objDescription.Locked = false
objDescription.Opened = false
${coverUrl ? 'objDescription.Media=objLoveCover' : ''}
${coverUrl ? 'objDescription.Icon=objLoveCover' : ''}

objCompletion = Wherigo.ZItem{
    Cartridge = wigoLove, 
    Container = Player
}
objCompletion.Id = "76a53b31-e5f6-425d-8ed6-88082750cd84"
objCompletion.Description = [[]]
objCompletion.Visible = false
objCompletion.ObjectLocation = Wherigo.INVALID_ZONEPOINT
objCompletion.Locked = false
objCompletion.Opened = false
${coverUrl ? 'objCompletion.Media=objLoveCover' : ''}
${coverUrl ? 'objCompletion.Icon=objLoveCover' : ''}

-- Tasks --
${taskCode}

-- Cartridge Variables --
-- objPamatky = 15
objPamatky = ${requiredPoints}
objdead = true
currentZone = "objLoveZone1"
currentCharacter = "dummy"
currentItem = "objHowManyLeft"
--currentTask = "objLoveTask1"
-- currentInput = "objDulHlubina2"
currentTimer = "dummy"
currentLanguage = "${defaultLocale}"
${variablesCode.join("\n")}
wigoLove.ZVariables = {
    objPamatky = ${requiredPoints}, 
    objdead = true,
    ${variablesCode.join(",    \n")},
    currentZone = "objLoveZone1", 
    currentCharacter = "dummy", 
    currentItem = "objHowManyLeft", 
--    currentTask = "objLoveTask1", 
--    currentInput = "objDulHlubina2", 
    currentTimer = "dummy",
    currentLanguage = "${defaultLocale}"
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
    ${availableLangs.length > 1 ? 'Wherigo.GetInput(zinputLang)' : ''}
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
        Text = i18n("howManyLeftContent", objPamatky), 
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
        Text = i18n("completionCodeContent")..string.sub(Player.CompletionCode, 1, 15), 
        ${coverUrl ? 'Media = objLoveCover,' : ''} 
        Callback = function(action)
            if action ~= nil then
                Wherigo.ShowScreen(Wherigo.MAINSCREEN)
            end
        end
    }
end

${'' && `
objTester = Wherigo.ZItem{
    Cartridge = wigoLove, 
    Container = Player
}
objTester.Id = "4b247564-9007-4a78-9fec-b4efa9957a6d"
objTester.Name = [[Tester]]
objTester.Description = ""
objTester.Visible = true
objTester.ObjectLocation = Wherigo.INVALID_ZONEPOINT
objTester.Locked = false
objTester.Opened = false
function objTester:OnClick()
    MakeAllZonesVisible()
end
`}

objFotohint = Wherigo.ZItem(wigoLove)
objFotohint.Id = "47b8b44c-db97-4116-a743-cc129c7427ff"
objFotohint.Visible = true
${spoilerUrl ? 'objFotohint.Media = objLoveSpoiler' : ''}
${spoilerUrl ? 'objFotohint.Icon = objLoveSpoiler' : ''}
objFotohint.Commands = {}
objFotohint.ObjectLocation = Wherigo.INVALID_ZONEPOINT
objFotohint.Locked = false
objFotohint.Opened = false

function objFotohint:OnClick()
    _Urwigo.MessageBox{
        Text = ${finalDescription}, 
        ${spoilerUrl ? 'Media = objLoveSpoiler,' : ''} 
        Callback = function(action)
           Wherigo.ShowScreen(Wherigo.INVENTORYSCREEN)
        end
    }
end

function objFinito()
    objFotohint:MoveTo(Player)
    objHowManyLeft.Visible = false
    objCompletion.Visible = true
    wigoLove.Complete = true
    ${allZonesVisibleWhenFinished ? 'MakeAllZonesVisible()' : ''}
    _Urwigo.MessageBox{
        Text = i18n("finalSuccessMessage") .. [[
]]..${finalDescription}, 
        Callback = function(action)
            Wherigo.ShowScreen(Wherigo.INVENTORYSCREEN)
        end
    }
end

function tasksToGo()
    cpl = ${requiredPoints}
    for k,z in ipairs(wigoLove.AllZObjects) do
        if Wherigo.NoCaseEquals(tostring(z), "a ZTask instance") then
            if z.Complete then
                cpl = cpl - 1
            end
        end
    end
    if cpl > 0 then
        return cpl
    else
        return 0
    end
end

LANGUAGES = {}
${availableLangs.map(l => `LANGUAGES["${l}"] = {}`).join("\n")}
${availableLangs.map(l => Object.entries(i18n[l]).map(v => `LANGUAGES["${l}"]["${v[0]}"] = [[${v[1]}]]`).join("\n")).join("\n")}

function i18n(stringid, variable)
   value = LANGUAGES[currentLanguage][stringid]
   if value ~= nil and variable ~= nil then
     value = string.gsub(value, "%%", variable)
   end
   return value
end

function changeLocale(loc)
currentLanguage = loc
${i18nCode.join("\n")}
wigoLove.RequestSync()
end

changeLocale(currentLanguage)

function objLang:OnClick()
    _Urwigo.RunDialogs(function()
        Wherigo.GetInput(zinputLang)
    end)
end

function zinputLang:OnGetInput(input)
    changeLocale(input)
end 

return wigoLove`;
}
