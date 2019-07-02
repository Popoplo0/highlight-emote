/// <reference path="/alt1lib.js">
/// <reference path="/runeappslib.js">
/// <reference path="/apps/alt1/alt1doc.js">
/// <reference path="/imagelibs/ocr.js">
/// <reference path="/apps/clue/cluescroll.js">
/// <reference path="/apps/slidesolver/scripts.js">
/// <reference path="/apps/ttsolver/scripts.js">
/// <reference path="/apps/ttsolver/knotreader.js">
/// <reference path="/apps/alt1/towers/towers.js">
/// <reference path="/apps/alt1/lockbox/lockbox.js">


var currenttab = 0;
var checkonalt1 = false;
var cluereader = null;
var lockboxreader = new LockBoxReader();
var lockboxsolver = new LockBoxSolver();
lockboxreader.onmessage = function (m) { elid("lockboxout").innerText = m; }
var towersreader = new TowersReader();
var towerssolver = new TowersSolver();
towersreader.onmessage = function (m) { elid("towersout").innerText = m; }
var trackinterval = 0;
var clueopen = false;

textinterface = new InterfaceTracker(new Rect(-474, 25, 496, 293), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAYAAAArdgcFAAAFUklEQVQ4T21V31MbVRT+dkP2R7JJNgkhIRBICIRf8qNo28FiaR1HZ+w4teOTjr75pjPqs3+EPuibz76q43RsRyvtiGUstEBbKKSk/BISCCSbhJAlYbN67prOdMbzdLO597vf/c53zuE+/OxL89avN3BS0sDZRQiSjGwmg3rtBJBcmLx4EdvrKexsb0J2OtHsciG8toiLfT70cioG+7pAsbTyDKumhtsrOez1jCJbLILz94yahcMsPKoHXtWHjY11SJIEXdfx2uU3GHAmk4adr0N1utGxuYzJfj+++OYKqk+OkPo5y8Dj7wQg9Cv46tPruLOSx2ZbDFyTr80kYNntw25qBaIkQ5YEjJyb+F/gLt7E2bZWXPlkEJFXm7F994CBN9bXv13C7E4a67CBU8JxU21pRWZrHXYbj5pRx9nxCWTTO8hl06joVYS8bgQ2khhsMtGrqoiEmhng6DUfeic8bL06XcDCDzm23s4cYFXTwHWPTZikJ4FSkNaTb17BxtMkMum/caJXMDI0gvDCNKLEUHXB7ZTZ3vPvujAy6WTrxTtl/PVjia2L5Qr2tSI43tVsOpwOGIYJm13AcakAh8uD3v4BrD5ZRiW/h1BHHD2RCOIzt+AxDSh2G976wIdzlyTcu60zwMb65vc5HNUMaHyTpTnJQcCiJKKgFVhCKeiC5YcLqObSCMQHEfH7MLQ4g1cSwMefO/Dn76eY+qnG9l6+aseF15vw3dfHmFvj8ejMBDg5EDFJEgIk1rxdZNo7XC5EY3HolQo2nyVRPSpAbQmjMxjCaGoOZ8I1rCUtKRvRneDxYNeO+fjLEANhS3OyGgXZr2HDaDSGvJZj9pQ8XmysLqNaPEBLewwBxYGBlUdQ69UXwPO8gMWel+CJxHB/ZtoC1+uAUa2gqlcYWFm31m9ffQ9TU1PMSf2DQ1hPPUW1dAhfMIxIIIjEw1kIpg4HbGDAXX0IdPVg/v4cyuWyBS47FezubOFEP4FLVeFTvRg7P45709PY2dmC4A+BK+fR2hlH6vECjNMaWoIhBGQBg8llmByHp2fGYXMqWF56DMMwGA5nkxWzJdbLnlfSNKb7tfc/ws0bN2BUjuBv62TMSS464A+GLYkqZaheL1RFgVv1IhTtxh9TvzFgqhtSguPsTlNSfRgYHsVuehfDo2OYm53FSbmEYDSO/HYKmmYlmioZNgGt7RF2AdlUULzs7OL8A0iKG6rPD20/zf5jViTWdJDcsXeYR6WYgxpqx+bKEnuRJNggOhQmG0u64kass5NJmegfwqP5ObaPGDeAPc1Bq/zpAEUgFEI01o2Fe3fBubzg9fILbmi4iepB5IHOXgu4LjkRVt2swRFj2Rtkr+aUjn4Tp1W2gcBCoVaYkgOqTO3XgaNiAcdUB6hjdeUJuyzS3oFoT4JpTLloa+tANrOFwsEeiLE3EoeW3QfnG7pgVgs50AVoEiCKIoaHR5DN5XC4t8uSTEFsSYKN9TWMnRvHzK1fUDWAaO/Ac/0bjI+1Q3aOax+dMLXcIY4rOiAIGEgkoOUt3UljepGe3QVv4xEIR5hsyeTqCwknxrLHh2BXH2NM84HyxJh7XVZnk0WRAVNS6BX6UZG1AuqM3KmVF3IH9SGSjypYS2+xb22RTlZ8xJhy0+LzWAltyAGjytg2giW6XkPdqD8fIsWyjlBHjL2MgGVJBkSZuem4ZLVcuui4mLPASU8CNWpVxooAqQUTY5pM9I3+c6h+eF3Kc1cQY2pwDVBmx0ALm8dUG6wrNpjWaChT8HZrQP8XVEAUDcb57D77TXOAJduhsFZNLirm95HLZMD9+6J/AAVWnqa4ltR0AAAAAElFTkSuQmCC");


jscluefont = JSON.parse(
	'{"chars":[{"width":10,"chr":"A","bonus":0.05,"secondary":false,"pixels":[1,9,250,2,6,245,2,7,255,2,8,241,3,3,241,3,4,255,3,5,240,3,6,255,4,0,235,4,1,255,4,2,240,4,6,255,5,0,250,5,1,255,5,2,235,5,6,255,6,3,250,6,4,255,6,5,236,6,6,255,7,6,255,7,7,255,7,8,231,8,8,236,8,9,255]},{"width":9,"chr":"B","bonus":0.06,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,0,255,2,5,255,2,9,255,3,0,255,3,5,255,3,9,255,4,0,255,4,5,255,4,9,255,5,0,246,5,4,231,5,5,255,5,9,241,6,1,250,6,2,255,6,3,255,6,4,241,6,6,250,6,7,255,6,8,250]},{"width":10,"chr":"C","bonus":0.04,"secondary":false,"pixels":[1,3,255,1,4,255,1,5,255,1,6,250,2,1,240,2,2,240,2,7,240,2,8,240,3,1,236,3,8,240,4,0,245,4,9,245,5,0,255,5,9,255,6,0,250,6,9,250,7,0,236,7,9,235,8,1,246,8,8,255]},{"width":10,"chr":"D","bonus":0.06,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,0,255,2,9,255,3,0,255,3,9,255,4,0,255,4,9,255,5,0,250,5,9,250,6,1,240,6,8,240,7,1,245,7,2,240,7,7,240,7,8,245,8,2,231,8,3,255,8,4,255,8,5,255,8,6,255,8,7,230]},{"width":8,"chr":"E","bonus":0.042,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,0,255,2,5,255,2,9,255,3,0,255,3,5,255,3,9,255,4,0,255,4,5,255,4,9,255,5,0,255,5,9,255]},{"width":7,"chr":"F","bonus":0.034,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,0,255,2,5,255,3,0,255,3,5,255,4,0,255,4,5,255,5,0,255]},{"width":10,"chr":"G","bonus":0.052,"secondary":false,"pixels":[1,3,255,1,4,255,1,5,255,1,6,255,2,1,241,2,2,237,2,7,241,2,8,246,3,1,237,3,8,236,3,9,231,4,0,255,4,9,255,5,0,255,5,9,255,6,0,251,6,5,232,6,9,241,7,1,241,7,5,255,7,8,251,8,5,255,8,6,255,8,7,255,8,8,255,8,9,255]},{"width":9,"chr":"H","bonus":0.05,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,5,255,3,5,255,4,5,255,5,5,255,6,5,255,7,0,255,7,1,255,7,2,255,7,3,255,7,4,255,7,5,255,7,6,255,7,7,255,7,8,255,7,9,255]},{"width":5,"chr":"I","bonus":0.028,"secondary":false,"pixels":[1,0,255,1,9,255,2,0,255,2,1,255,2,2,255,2,3,255,2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,3,0,255,3,9,255]},{"width":8,"chr":"J","bonus":0.04,"secondary":false,"pixels":[1,7,255,1,8,236,2,8,237,2,9,237,3,0,246,3,9,255,4,0,255,4,9,255,5,0,255,5,8,237,5,9,237,6,0,255,6,1,255,6,2,255,6,3,255,6,4,255,6,5,255,6,6,255,6,7,255,6,8,237]},{"width":9,"chr":"K","bonus":0.044,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,5,255,3,5,255,4,3,236,4,4,255,4,5,231,4,6,255,5,1,236,5,2,255,5,7,245,5,8,241,6,0,255,6,9,255]},{"width":8,"chr":"L","bonus":0.03,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,9,255,3,9,255,4,9,255,5,9,255,6,9,230]},{"width":12,"chr":"M","bonus":0.068,"secondary":false,"pixels":[2,2,231,2,3,232,2,4,241,2,5,246,2,6,251,2,7,255,2,8,255,2,9,255,3,0,255,3,1,255,3,2,255,3,3,232,4,2,241,4,3,255,4,4,232,5,5,255,5,6,246,6,6,246,6,7,255,7,4,237,7,5,255,7,6,237,8,2,246,8,3,251,9,0,255,9,1,255,9,2,255,9,3,236,10,4,232,10,5,237,10,6,241,10,7,246,10,8,250,10,9,255]},{"width":10,"chr":"N","bonus":0.058,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,1,251,2,2,246,3,2,231,3,3,255,4,4,246,4,5,241,5,6,255,6,7,241,6,8,246,7,0,255,7,1,255,7,2,255,7,3,255,7,4,255,7,5,255,7,6,255,7,7,255,7,8,255,7,9,255]},{"width":11,"chr":"O","bonus":0.052,"secondary":false,"pixels":[1,3,255,1,4,255,1,5,255,1,6,251,2,1,241,2,2,241,2,7,241,2,8,241,3,1,236,3,8,236,4,0,246,4,9,246,5,0,255,5,9,255,6,0,246,6,9,246,7,1,241,7,8,246,8,1,236,8,2,246,8,7,246,8,8,232,9,3,246,9,4,255,9,5,255,9,6,241]},{"width":9,"chr":"P","bonus":0.05,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,0,255,2,6,255,3,0,255,3,6,255,4,0,255,4,6,255,5,0,236,5,1,236,5,5,237,5,6,236,6,1,236,6,2,255,6,3,255,6,4,255,6,5,237]},{"width":9,"chr":"R","bonus":0.052,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,0,255,2,5,255,3,0,255,3,5,255,4,0,255,4,5,255,5,0,241,5,5,246,5,6,250,5,7,250,6,1,246,6,2,255,6,3,255,6,4,246,6,8,251,6,9,246]},{"width":7,"chr":"S","bonus":0.034,"secondary":false,"pixels":[1,1,246,1,2,255,1,3,255,1,8,250,2,0,241,2,4,255,2,9,250,3,0,255,3,4,236,3,9,255,4,0,251,4,5,255,4,9,246,5,1,232,5,6,255,5,7,255,5,8,251]},{"width":10,"chr":"T","bonus":0.032,"secondary":false,"pixels":[1,0,255,2,0,255,3,0,255,4,0,255,4,1,255,4,2,255,4,3,255,4,4,255,4,5,255,4,6,255,4,7,255,4,8,255,4,9,255,5,0,255,6,0,255,7,0,255]},{"width":10,"chr":"U","bonus":0.044,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,251,2,8,251,3,9,241,4,9,255,5,9,255,6,9,241,7,8,250,8,0,255,8,1,255,8,2,255,8,3,255,8,4,255,8,5,255,8,6,255,8,7,246]},{"width":10,"chr":"V","bonus":0.04,"secondary":false,"pixels":[1,0,250,2,1,236,2,2,255,2,3,246,3,4,236,3,5,255,3,6,241,4,7,241,4,8,255,4,9,241,5,7,241,5,8,255,5,9,241,6,4,236,6,5,255,6,6,241,7,1,236,7,2,255,7,3,246,8,0,250]},{"width":13,"chr":"W","bonus":0.076,"secondary":false,"pixels":[1,0,255,1,1,236,2,2,237,2,3,255,2,4,255,2,5,241,3,6,232,3,7,246,3,8,255,3,9,246,4,6,233,4,7,251,4,8,255,4,9,237,5,2,237,5,3,255,5,4,255,5,5,237,6,0,255,6,1,255,6,2,255,7,2,232,7,3,251,7,4,255,7,5,241,8,7,246,8,8,255,8,9,241,9,6,236,9,7,255,9,8,255,9,9,241,10,2,241,10,3,255,10,4,255,10,5,236,11,0,255,11,1,236]},{"width":9,"chr":"Y","bonus":0.032,"secondary":false,"pixels":[1,0,250,2,1,250,2,2,241,3,3,255,3,4,236,4,4,255,4,5,255,4,6,255,4,7,255,4,8,255,4,9,255,5,3,251,5,4,241,6,1,246,6,2,250,7,0,255]},{"width":9,"chr":"Z","bonus":0.044,"secondary":false,"pixels":[1,9,231,2,0,255,2,8,255,2,9,255,3,0,255,3,6,250,3,7,246,3,9,255,4,0,255,4,4,236,4,5,255,4,9,255,5,0,255,5,3,255,5,4,236,5,9,255,6,0,255,6,1,240,6,2,245,6,9,255,7,0,255,7,9,255]},{"width":8,"chr":"a","bonus":0.042,"secondary":false,"pixels":[1,7,246,1,8,255,2,3,236,2,6,232,2,9,246,3,3,255,3,6,246,3,9,255,4,3,255,4,6,255,4,9,250,5,3,241,5,4,231,5,6,255,5,8,241,6,4,241,6,5,255,6,6,255,6,7,255,6,8,255,6,9,255]},{"width":8,"chr":"b","bonus":0.05,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,4,246,2,8,246,3,3,251,3,9,250,4,3,255,4,9,255,5,3,237,5,4,237,5,8,237,5,9,232,6,4,237,6,5,255,6,6,255,6,7,255,6,8,232]},{"width":8,"chr":"c","bonus":0.024,"secondary":false,"pixels":[1,5,255,1,6,255,1,7,255,2,4,245,2,8,245,3,3,250,3,9,250,4,3,255,4,9,255,5,3,245,5,9,245,6,8,240]},{"width":8,"chr":"d","bonus":0.05,"secondary":false,"pixels":[1,4,231,1,5,255,1,6,255,1,7,255,1,8,236,2,3,231,2,4,236,2,8,236,2,9,231,3,3,255,3,9,255,4,3,250,4,9,251,5,4,245,5,8,246,6,0,255,6,1,255,6,2,255,6,3,255,6,4,255,6,5,255,6,6,255,6,7,255,6,8,255,6,9,255]},{"width":8,"chr":"e","bonus":0.036,"secondary":false,"pixels":[1,5,255,1,6,255,1,7,255,2,4,241,2,6,255,2,8,241,3,3,255,3,6,255,3,9,250,4,3,255,4,6,255,4,9,255,5,3,231,5,4,236,5,6,255,5,9,246,6,5,250,6,6,255]},{"width":6,"chr":"f","bonus":0.028,"secondary":false,"pixels":[1,3,245,2,1,246,2,2,255,2,3,255,2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,3,0,246,3,3,255,4,0,255,4,3,246]},{"width":8,"chr":"g","bonus":0.052,"secondary":false,"pixels":[1,4,236,1,5,255,1,6,255,1,7,255,1,8,236,2,3,241,2,4,231,2,8,231,2,9,246,2,12,251,3,3,255,3,9,255,3,12,255,4,3,236,4,9,241,4,11,232,4,12,236,5,3,255,5,4,255,5,5,255,5,6,255,5,7,255,5,8,255,5,9,255,5,10,255,5,11,241]},{"width":9,"chr":"h","bonus":0.04,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,4,250,3,3,241,4,3,255,5,3,250,6,4,255,6,5,255,6,6,255,6,7,255,6,8,255,6,9,255]},{"width":4,"chr":"i","bonus":0.016,"secondary":false,"pixels":[1,0,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255]},{"width":5,"chr":"j","bonus":0.024,"secondary":false,"pixels":[0,12,246,1,12,251,2,0,255,2,3,255,2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255]},{"width":7,"chr":"k","bonus":0.04,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,6,255,3,5,235,3,6,255,3,7,231,4,4,255,4,5,230,4,7,236,4,8,245,5,3,255,5,9,255]},{"width":5,"chr":"l","bonus":0.02,"secondary":false,"pixels":[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,2,9,255]},{"width":12,"chr":"m","bonus":0.052,"secondary":false,"pixels":[1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,4,251,3,3,241,4,3,255,5,3,246,6,4,251,6,5,255,6,6,255,6,7,255,6,8,255,6,9,255,7,4,241,8,3,255,9,3,255,10,4,255,10,5,255,10,6,255,10,7,255,10,8,255,10,9,255]},{"width":8,"chr":"n","bonus":0.034,"secondary":false,"pixels":[1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,4,251,3,3,241,4,3,255,5,3,250,6,4,255,6,5,255,6,6,255,6,7,255,6,8,255,6,9,255]},{"width":9,"chr":"o","bonus":0.032,"secondary":false,"pixels":[1,5,255,1,6,255,1,7,255,2,4,246,2,8,246,3,3,246,3,9,246,4,3,255,4,9,255,5,3,246,5,9,246,6,4,250,6,8,251,7,5,246,7,6,255,7,7,246]},{"width":8,"chr":"p","bonus":0.048,"secondary":false,"pixels":[1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,2,4,241,2,8,246,3,3,250,3,9,250,4,3,255,4,9,255,5,3,236,5,4,236,5,8,236,5,9,231,6,4,236,6,5,255,6,6,255,6,7,255,6,8,231]},{"width":8,"chr":"q","bonus":0.048,"secondary":false,"pixels":[1,4,231,1,5,255,1,6,255,1,7,255,1,8,236,2,3,231,2,4,236,2,8,236,2,9,236,3,3,255,3,9,255,4,3,250,4,9,250,5,4,241,5,8,245,6,3,255,6,4,255,6,5,255,6,6,255,6,7,255,6,8,255,6,9,255,6,10,255,6,11,255]},{"width":6,"chr":"r","bonus":0.018,"secondary":false,"pixels":[1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,2,4,250,3,3,250]},{"width":6,"chr":"s","bonus":0.022,"secondary":false,"pixels":[1,4,255,1,5,255,1,9,231,2,3,255,2,6,246,2,9,255,3,3,255,3,6,250,3,9,255,4,7,255,4,8,255]},{"width":5,"chr":"t","bonus":0.026,"secondary":false,"pixels":[0,3,255,1,1,251,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,246,2,3,255,2,9,246,3,3,246,3,9,255]},{"width":9,"chr":"u","bonus":0.034,"secondary":false,"pixels":[1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,250,2,9,246,3,9,255,4,9,255,5,8,255,6,3,255,6,4,255,6,5,255,6,6,255,6,7,255,6,8,255,6,9,255]},{"width":8,"chr":"v","bonus":0.028,"secondary":false,"pixels":[1,3,251,2,4,236,2,5,255,2,6,241,3,7,246,3,8,255,3,9,232,4,8,255,4,9,251,5,5,246,5,6,255,5,7,232,6,3,255,6,4,241]},{"width":12,"chr":"w","bonus":0.048,"secondary":false,"pixels":[1,3,251,2,4,232,2,5,255,2,6,250,3,8,255,3,9,255,4,7,241,4,8,255,4,9,232,5,4,237,5,5,255,5,6,236,6,4,255,6,5,246,7,6,237,7,7,255,7,8,236,8,8,255,8,9,255,9,5,236,9,6,255,9,7,246,10,3,255,10,4,241]},{"width":8,"chr":"x","bonus":0.028,"secondary":false,"pixels":[1,9,246,2,3,241,2,4,251,2,8,255,3,5,250,3,6,250,3,7,246,4,5,250,4,6,250,4,7,246,5,3,241,5,4,250,5,8,255,6,9,246]},{"width":9,"chr":"y","bonus":0.036,"secondary":false,"pixels":[1,3,250,1,12,241,2,4,246,2,5,255,2,6,232,2,12,255,3,7,251,3,8,250,3,11,251,4,8,255,4,9,255,4,10,236,5,5,232,5,6,255,5,7,246,6,3,251,6,4,255,6,5,231]},{"width":8,"chr":"z","bonus":0.036,"secondary":false,"pixels":[1,3,255,1,9,255,2,3,255,2,7,237,2,8,255,2,9,255,3,3,255,3,6,246,3,7,237,3,9,255,4,3,255,4,5,251,4,9,255,5,3,255,5,4,255,5,9,255,6,3,251,6,9,255]},{"width":9,"chr":"0","bonus":0.044,"secondary":false,"pixels":[1,2,236,1,3,250,1,4,255,1,5,255,1,6,250,1,7,236,2,1,255,2,8,255,3,0,250,3,9,251,4,0,255,4,9,255,5,0,250,5,9,250,6,1,255,6,8,255,7,2,236,7,3,250,7,4,255,7,5,255,7,6,250,7,7,236]},{"width":7,"chr":"1","bonus":0.032,"secondary":false,"pixels":[1,2,241,1,9,255,2,1,250,2,9,255,3,0,255,3,1,255,3,2,255,3,3,255,3,4,255,3,5,255,3,6,255,3,7,255,3,8,255,3,9,255,4,9,255,5,9,255]},{"width":8,"chr":"2","bonus":0.042,"secondary":false,"pixels":[2,1,255,2,7,241,2,8,255,2,9,255,3,0,241,3,6,246,3,7,231,3,9,255,4,0,255,4,5,241,4,6,232,4,9,255,5,0,246,5,4,236,5,5,241,5,9,255,6,1,246,6,2,255,6,3,255,6,4,231,6,9,255]},{"width":8,"chr":"3","bonus":0.048,"secondary":false,"pixels":[1,8,231,2,0,255,2,8,236,2,9,231,3,0,255,3,4,255,3,9,255,4,0,255,4,2,231,4,3,245,4,4,250,4,9,255,5,0,255,5,1,250,5,2,236,5,4,231,5,5,236,5,8,236,5,9,231,6,0,255,6,5,236,6,6,255,6,7,255,6,8,236]},{"width":9,"chr":"4","bonus":0.044,"secondary":false,"pixels":[1,5,236,1,6,255,2,4,246,2,6,255,3,3,250,3,6,255,4,2,250,4,6,255,5,0,231,5,1,255,5,6,255,6,0,255,6,1,255,6,2,255,6,3,255,6,4,255,6,5,255,6,6,255,6,7,255,6,8,255,6,9,255,7,6,255]},{"width":8,"chr":"5","bonus":0.044,"secondary":false,"pixels":[2,0,255,2,1,255,2,2,255,2,3,245,2,4,255,2,9,236,3,0,255,3,4,255,3,9,255,4,0,255,4,4,255,4,9,255,5,0,255,5,4,235,5,5,235,5,8,236,5,9,230,6,0,230,6,5,235,6,6,255,6,7,255,6,8,236]},{"width":9,"chr":"6","bonus":0.054,"secondary":false,"pixels":[1,3,237,1,4,251,1,5,255,1,6,255,1,7,236,2,2,255,2,3,232,2,4,241,2,5,241,2,7,232,2,8,255,3,1,251,3,4,251,3,9,246,4,0,251,4,4,255,4,9,255,5,0,255,5,4,255,5,9,255,6,0,255,6,4,232,6,5,241,6,8,246,7,5,232,7,6,255,7,7,255]},{"width":9,"chr":"7","bonus":0.032,"secondary":false,"pixels":[1,0,255,2,0,255,2,8,255,2,9,241,3,0,255,3,6,255,3,7,236,4,0,255,4,4,255,4,5,237,5,0,255,5,1,237,5,2,255,5,3,237,6,0,255,6,1,232]},{"width":9,"chr":"8","bonus":0.058,"secondary":false,"pixels":[1,1,241,1,2,255,1,3,241,1,6,255,1,7,255,2,0,236,2,1,236,2,3,236,2,4,255,2,5,241,2,8,246,3,0,255,3,4,255,3,9,255,4,0,255,4,4,231,4,9,255,5,0,241,5,4,241,5,5,241,5,9,250,6,1,250,6,2,255,6,3,255,6,4,231,6,5,255,6,8,246,7,6,250,7,7,255]},{"width":9,"chr":"9","bonus":0.05,"secondary":false,"pixels":[1,2,251,1,3,255,1,4,251,2,1,251,2,5,251,2,9,255,3,0,255,3,6,251,3,9,255,4,0,255,4,6,255,4,9,250,5,0,241,5,6,241,5,8,241,6,1,251,6,2,236,6,5,251,6,6,236,6,7,246,6,8,241,7,3,246,7,4,255,7,5,255,7,6,246]},{"width":6,"chr":"-","bonus":0.008,"secondary":true,"pixels":[1,6,255,2,6,255,3,6,255,4,6,231]},{"width":3,"chr":":","bonus":0.004,"secondary":true,"pixels":[1,2,255,1,8,255]},{"width":4,"chr":".","bonus":0.002,"secondary":true,"pixels":[1,9,255]},{"width":4,"chr":",","bonus":0.006,"secondary":true,"pixels":[1,9,235,1,10,230,2,8,255]},{"width":4,"chr":"!","bonus":0.016,"secondary":true,"pixels":[1,0,250,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,9,250]},{"width":7,"chr":"?","bonus":0.02,"secondary":false,"pixels":[1,0,241,2,0,255,2,5,237,2,6,255,2,9,255,3,0,251,3,4,251,4,1,251,4,2,255,4,3,255]},{"width":4,"chr":"\'","bonus":0.004,"secondary":true,"pixels":[2,0,246,2,1,236]}],"width":13,"spacewidth":3,"shadow":false,"height":13,"basey":9}'
);

function focus() {
	elid("solvepaste").classList.remove("blur");
}

function blur() {
	if (map.document && map.document.hasFocus()) { return; }
	if (document.hasFocus()) { return; }
	elid("solvepaste").classList.add("blur");
}

function settab(tabnr) {
	var el;
	var els = elcl("contenttab");
	for (var a = 0; a < els.length; a++) { els[a].classList.remove("activetab"); }
	var els = elcl("tabcontent");
	for (var a = 0; a < els.length; a++) { els[a].style.display = "none"; }
	if (el = elid("contenttab" + tabnr)) { el.classList.add("activetab"); }
	if (el = elid("tabcontent" + tabnr)) { el.style.display = "block"; }

	if (currenttab == 2 && tabnr != 2) { map.togglemenu(false); }
	if (currenttab == 5 && tabnr != 5) { towersreader.stopOverlay(); }

	currenttab = tabnr;
}

document.addEventListener("DOMContentLoaded", start);

function start() {
	a1lib.identifyUrl("appconfig.json");
	ss.start();
	knot.start();
	window.addEventListener("blur", blur);
	window.addEventListener("focus", focus);
	PasteInput.listen(pasted, pasteerror, true);
	if (window.alt1 && alt1.permissionPixel) {
		overrideselect();
	} else {
		elid("clueout").innerHTML = "Press print-screen on your keyboard to make a screenshot of the puzzle.<br/><br/>Then click the app and press ctrl+v to paste the screenshot."
		elid("solvepaste").style.display = "block";
		elid("solvebutton").style.display = "none";
		if (!document.hasFocus()) {
			blur();
		}
	}

	cluereader = new ClueScrollReader();

	starttrack();

	/*
	//looks cool but lets not do this, maybe after added a proxy of some sorts so this doesn't require a cross origin request
	var args = arglist(top);
	if (args.preloadimg) {
		setTimeout(function () {
			ImageData.fromUrl(args.preloadimg, function (i) {
				unlock(new ImgRefData(i));
			})
		}, 500);
	}*/
}

function starttrack() {
	trackinterval = setInterval(tracktick, 200);
}

function stoptrack() {
	clearInterval(trackinterval);
	trackinterval = 0;
}

function tracktick() {
	if (clueopen) {
		if (!cluereader.refind()) {
			clueopen = false;
			knot.clearoverlay();
			ss.togglesolution(false);
		}
	} else {
		unlock(null, true);
	}
}

function maploaded(wnd) {
	map = wnd;
	map.addEventListener("blur", blur);
	map.addEventListener("focus", focus);
}

function pasteerror(t) {
	settab(3);
	var frag = elfrag();
	frag.appendChild(eldiv(":p", [t]));
	frag.appendChild(eldiv(":p", ["Alternatively, ", eldiv(":a", { href: "#", onclick: PasteInput.fileDialog.b() }, ["upload your screenshot"]), "."]));
	elput("clueout", frag);
}

function clicksolve() {
	var img;
	try { img = a1lib.bindfullrs(); } catch (e) { }

	if (!img) {
		var problem = "Failed to grab image from your screen. There is more information under Alt1 settings &gt; capture.";
		if (alt1.permissionPixel == false) { problem = "Need 'view screen' permission to grab pixels from the screen. The app permissions can be found by clicking the spanner on the top right of this window."; }
		if (alt1.rsLinked == false) { problem = "Can't find the Runescape window. There is more information under Alt1 settings &gt; capture."; }
		settab(3);
		elid("clueout").innerHTML = problem;
		return;
	}

	unlock(img);
}

function pasted(canvas) {
	var img = new ImgRefData(imagetobuffer(canvas));
	unlock(img);
}

function unlock(img, soft) {
	var typepos = cluereader.find(img, soft);

	var matchtype = "";
	if (typepos) {
		matchtype = typepos.intf.name;
		img = typepos.img;
	}

	if (matchtype) { a1lib.doSomethingCool(0, 1); }

	if (matchtype) {
		if (soft && clueopen) { return; }
		clueopen = true;
	}

	if (matchtype == "knot") {
		knot.reader = cluereader.knotreader;
		knot.foundpuzzle(img);
		settab(0);
		return;
	}

	if (matchtype == "slide" || matchtype == "slidelegacy") {
		ss.osrs = false;
		ss.slideimglegacy.pos = { x: typepos.corex, y: typepos.corey };
		ss.slideimg.pos = { x: typepos.corex, y: typepos.corey };
		ss.foundpuzzle(img, ss.slideimg.pos);
		if (trackinterval && ss.autostart) {
			ss.sceduledisplay();
		}
		settab(1);
		return;
	}

	if (matchtype == "textclue" || matchtype == "textlegacy") {
		textinterface.pos = { x: typepos.corex, y: typepos.corey };
		if (solvetextclue(img, textinterface.pos)) { return; }
	}

	if (!soft) {
		if (typepos = map.compassinterface.find(img)) {
			if (!window.alt1) {
				if (currenttab == 2 && map.lastalt1coord) {
					map.docompass(map.lastalt1coord.x, map.lastalt1coord.y, img);
				} else {
					map.nonalt1compassdir = map.getcompassdir(img);
				}
			}
			elid(map.menuroot, "compasscheckboxarc").checked = map.isArcClue(img);
			settab(2);
			map.togglemenu(1, true);
			return;
		}

		if (lockboxreader.find(img)) {
			var state = lockboxreader.read(img);
			var solution = lockboxsolver.solve(state, 0);
			elput("lockboxout", lockboxsolver.getImage(solution, lockboxreader.pos, img));
			settab(4);
			lockboxsolver.overlayMoves(solution, lockboxreader.pos);
			console.log(solution);
			return;
		}

		if (towersreader.find(img)) {
			if (!towersreader.find(img)) { return; }
			var state = towersreader.read(img);
			var solution = towerssolver.solve(state);

			var setSolution = function (n) {
				var n = n || 0;
				towersreader.startOverlay(solution, n);
				var els = [];
				var done = true;
				for (var a = 0; a < solution.solutions[n].length; a++) {
					if (towersreader.state.filled[a] != solution.solutions[n][a] + 1) { done = false; }
				}
				if (done) { els.push(eldiv(["You have completed the puzzle. If runescape does not accept this puzzle answer close and reopen the puzzle interface in game and click unlock any again. There is currently a display glitch in game."])); }
				els.push(towersreader.getSolutionImage(solution, n, towersreader.pos, img));
				elput(cnvwrap, elfrag.apply(null, els));
			}
			var els = [];
			if (solution.solutions.length > 1) {
				var n = 0;
				els.push(eldiv({ style: "display:flex;" }, solution.solutions.map(function (s) { return eldiv("nisbutton2", { onclick: setSolution.b(n), style: "flex:1" }, ["Solution " + (++n)]) })));
			}
			var cnvwrap = eldiv({ style: "display:flex; flex-direction:column; align-items:center;" });
			els.push(cnvwrap);
			elput("towersout", eldiv(els));
			setSolution();
			settab(5);
			return;
		}

		if (typepos = ss.slideosrs.find(img)) {
			ss.osrs = true;
			ss.foundpuzzle(img, ss.slideosrs.pos);
			settab(1);
			return;
		}
	}
	if (!soft) {
		clueopen = false;
		settab(3);
		if (window.alt1) {
			elid("clueout").innerHTML = "Couldn't find any clue or puzzle on your screen.<br><br>Check the <a href='alt1://showsettings/capture'>Alt1 capture settings</a> if none of the image detection features in Alt1 work.";
		} else {
			elid("clueout").innerHTML = "Couldn't find any clue or puzzle in your screenshot.<br>Common reasons are:<ul><li>You have DPI scaling enabled in Windows, you need the Alt1 Toolkit for it to work in this case.</li><li>You cropped the image too small. No cropping is needed at all.</li><li>The solver does not work on mac under some settings.</li></ul>";
		}
	}
}

alt1onrightclick = function (args) {
	if (checkonalt1) { unlock(a1lib.bindfullrs()); }
	if (window.map && map.alt1onrightclick(args)) {
		settab(2);
		map.togglemenu(1, true);
	}

	if (currenttab == 0) {
		knot.alt1pressed();
	}
}

solvetextclue = function (imgref, pos) {
	var a, b, c, d, pos, x, i, y, linescore, buf, linestart, str;

	buf = imgref.toData(pos.x, pos.y, 496, 293);

	str = [];
	linestart = 0;
	for (y = 60; y < 290; y++) {
		linescore = 0;
		for (x = 220; x < 320; x++) {
			i = 4 * x + 4 * buf.width * y;
			a = coldiff(buf.data[i], buf.data[i + 1], buf.data[i + 2], 84, 72, 56);
			if (a < 80) { linescore++; }
		}
		if (linescore >= 3) { if (linestart == 0) { linestart = y; } }
		else if (linestart != 0) {
			a = Math.abs(linestart - y);
			linestart = 0;
			if (a >= 6 && a <= 18) {
				var b = null;
				b = b || OCR.findReadLine(buf, jscluefont, [[84, 72, 56]], 255, y - 4);
				b = b || OCR.findReadLine(buf, jscluefont, [[84, 72, 56]], 265, y - 4);
				if (b) { str.push(b.text); }
				else { qw("failed to read string"); }
			}
		}
	}
	var cluetext = str.join(" ");
	qw(cluetext);

	if (str.length != 0 && checkcluetext(cluetext)) {
	}
	else {
		return matchimgclue(buf);
	}

	return true;
}

matchimgclue = function (buf) {
	var a, b, c, d, tiledata, score, bestscore, best;
	tiledata = a1lib.tiledata(buf, 20, 20, 90, 25, 300, 240);
	qw(JSON.stringify(tiledata));

	best = false;
	bestscore = 50000;
	for (a in textclues) {
		if (textclues[a].type != "img") { continue; }
		score = a1lib.comparetiledata(tiledata, textclues[a].clue);
		qw("score: " + spacednr(score));
		if (score < bestscore) { bestscore = score; best = textclues[a]; }
	}
	if (best) {
		qw("img matched, score: " + spacednr(bestscore));
		settab(2);
		map.setclue("<b>Image clue</b>", best.answer, best.x, best.y, true);
		return true;
	}
	return false;
	//if (tiledata) { dlpage("/node/clue/logclue?cluetext=" + encodeURIComponent(jsonEncode(tiledata)) + "&score=" + bestscore); }
}

checkcluetext = function (str) {
	var a, b, c, bestscore, best, score, answer;
	if (a = str.match(/^(\d{1,2}) degrees (\d{1,2}) minutes (north|south)\s+(\d{1,2}) degrees (\d{1,2}) minutes (east|west)$/mi)) {
		elid("coordinputdeg1").value = a[1];
		elid("coordinputmin1").value = a[2];
		elid("coordinputdir1").value = (a[3] == "north" ? "n" : "s");
		elid("coordinputdeg2").value = a[4];
		elid("coordinputmin2").value = a[5];
		elid("coordinputdir2").value = (a[6] == "west" ? "w" : "e");
		settab(2);
		map.togglemenu(0, true);
		map.setmarksextant();
		return true;
	}
	else {
		bestscore = 0;
		best = false;
		for (a in textclues) {
			if (textclues[a].type == "img") { continue; }
			score = strcomparescore(str, textclues[a].clue);
			if (score > bestscore) { best = textclues[a]; bestscore = score; }
		}

		//need to know which ones we're missing
		//if (str) { dlpage("/node/clue/logclue?cluetext=" + encodeURIComponent(str) + "&score=" + bestscore); }

		qw("Text clue match score: " + bestscore);
		qw("Text clue match: " + best.clue);
		if (bestscore < 0.5) { return false; }
		settab(2);
		if (best.type == "scan") {
			map.togglemenu(3, true);
			elid("scanselect").value = best.scan;
			map.changescan();
		}
		else {
			if (best.type == "emote") {
				if (!best.answer) { answer = ""; }
				else { answer = best.answer; }
			}
			else {
				answer = (best.answer ? "<b>Answer:</b> " + best.answer : "");
			}
			map.setclue("<b>Clue:</b> " + (best.cluetext || best.clue), answer, best.x, best.y, null, best.mapid || 0);
		}
	}
	return true;
}
