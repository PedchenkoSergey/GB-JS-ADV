
const testStr = "\'I read considerable to Jim about kings and dukes and earls and such, and how gaudy they dressed, and how much style they put on, and called each other your majesty, and your grace, and your lordship, and so on, stead of mister\' - and Jim's eyes bugged out, and he was interested. He says:\n" +
    "\n" +
    "\'I didn' know dey was so many un um. I hain't hearn 'bout none un um, skasely, but ole King Sollermun, onless you counts dem kings dat's in a pack er k'yards. How much do a king git?\'\n" +
    "\n" +
    "\'Get?\' I says; \'why, they get a thousand dollars a month if they want it; they can have just as much as they want; everything belongs to them.\'"


const regExp1 = new RegExp("'", 'gm')
console.log(regExp1.test(testStr))
console.log(testStr.match(regExp1))
console.log(testStr.replace(regExp1, '"'))

const regExp2 = new RegExp("([^a-z]|^)'([^a-z]|$)", 'gm')
console.log(regExp1.test(testStr))
console.log(testStr.match(regExp2))
console.log(testStr.replace(regExp2, '$1"$2'))


