import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ArticleLayout, ArticleDisclaimer } from '../../components/ArticleLayout'
import { useLanguage } from '../../contexts/LanguageContext'

function EnglishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        The best real estate deals rarely show up on the first page of Zillow. The investors who consistently buy below market value, find properties with massive upside, and close before the competition even shows up — they have mastered the art of deal sourcing. This guide breaks down every major sourcing channel, how to use it, and which tools to run after you find a lead.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. MLS Search Tricks: Finding Undervalued Listings Everyone Else Ignores</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The MLS (Multiple Listing Service) is accessible through Zillow, Realtor.com, and Redfin, and most investors dismiss it as "too competitive." That is a mistake. With the right filters, you can surface motivated sellers hiding in plain sight.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Days on Market (DOM) Filters</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Search for properties listed for <strong className="text-white">90+ days</strong>. A property sitting that long signals one of three things: overpriced, has a problem, or the seller is losing patience. Any of those can mean a negotiating opportunity. On Zillow, use the "Max Days on Zillow" filter. On Realtor.com, sort by "Newest" and flip to "Oldest." On Redfin, use the Days on Market filter under "More Filters."
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Price Reduction Filters</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Both Zillow and Realtor.com let you filter for "Price Reduced" listings. A seller who has already reduced their price once is psychologically primed to negotiate further. Sort by the highest percentage reduction — those are the sellers most motivated to move.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Keyword Searches in Listing Descriptions</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        This is the most underused trick on the MLS. Search for these exact phrases in listing descriptions:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">"Motivated seller"</strong> — the agent is telling you directly</li>
        <li><strong className="text-white">"As-is"</strong> — seller won't fix anything, often signals distress</li>
        <li><strong className="text-white">"Estate sale"</strong> — heirs may prioritize speed over price</li>
        <li><strong className="text-white">"Investor special"</strong> — agent knows it needs work</li>
        <li><strong className="text-white">"Needs TLC"</strong> — cosmetically or structurally distressed</li>
        <li><strong className="text-white">"Priced to sell"</strong> — urgency signal</li>
        <li><strong className="text-white">"Cash only"</strong> — may not qualify for financing, limits buyer pool</li>
        <li><strong className="text-white">"Sold as-is, where-is"</strong> — often bank-owned or probate</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        On Zillow, use the keyword search box under "More Filters." On Realtor.com, keywords can be entered in the search bar with quotes. Both platforms also let you save searches and set up email alerts — do this for each keyword combination so you are notified the moment a matching listing hits the market.
      </p>
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Use these tools after finding a lead:</strong> Run the{' '}
          <a href="/tools/deal_analyzer" className="text-blue-400 underline hover:text-blue-300">Deal Analyzer</a>{' '}
          to assess cash flow and returns, and the{' '}
          <a href="/tools/arv_comps" className="text-blue-400 underline hover:text-blue-300">ARV Comps Analyzer</a>{' '}
          to validate the property's after-repair value against nearby sales.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. FSBO (For Sale By Owner): Dealing Directly With Sellers</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        For Sale By Owner listings are properties sold without a real estate agent. This matters for investors because there is no agent commission built into the price (typically 2.5–3%), which creates more room to negotiate, and the seller is often handling the transaction themselves — meaning they may be more open to creative terms.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Where to Find FSBOs</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Zillow FSBO filter:</strong> Under "Listing Type," select "By Owner." Zillow has the largest FSBO database online.</li>
        <li><strong className="text-white">Craigslist:</strong> Search your city's "real estate for sale" section, filter by owner. Old school but still active in many markets.</li>
        <li><strong className="text-white">Facebook Marketplace:</strong> Search "house for sale" or "investment property" — many FSBOs post here because it is free and reaches local buyers quickly.</li>
        <li><strong className="text-white">Facebook Groups:</strong> Search for "real estate for sale [your city]" groups. Many have hundreds of posts per week.</li>
        <li><strong className="text-white">Yard signs:</strong> Drive neighborhoods. A handmade "For Sale By Owner" sign with a phone number is a direct line to a motivated seller with no gatekeeper.</li>
        <li><strong className="text-white">FSBO.com and ForSaleByOwner.com:</strong> Dedicated FSBO listing platforms, though Zillow's reach is larger.</li>
      </ul>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">How to Approach FSBO Sellers</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        FSBOs respond best to direct, respectful outreach. Call the number on the sign or message through the platform. Introduce yourself as an investor looking for a property in the area. Ask open-ended questions: "Why are you selling?" and "What is your ideal timeline?" Understanding their motivation helps you craft an offer that solves their actual problem — whether that is speed, certainty of close, or a specific price.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        FSBO sellers are often more flexible on terms like seller financing, lease-option agreements, or allowing longer inspection periods. They have not been coached by an agent to hold firm on price, which creates negotiating room.
      </p>
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Use these tools:</strong> If the FSBO is a potential buy-and-hold, use the{' '}
          <a href="/tools/rental_yield" className="text-blue-400 underline hover:text-blue-300">Rental Yield Calculator</a>.{' '}
          If the seller is open to creative financing, model the terms with the{' '}
          <a href="/tools/owner_finance" className="text-blue-400 underline hover:text-blue-300">Owner Finance Calculator</a>.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Driving for Dollars: Finding Deals Before They Hit the Market</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Driving for dollars means physically driving neighborhoods looking for distressed properties that have not been listed yet. These are the best deals because you have zero competition — you are the only investor who knows about them.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">What to Look For</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Overgrown grass and landscaping (absentee owner or neglect)</li>
        <li>Boarded or broken windows and doors</li>
        <li>Roofing damage visible from the street (missing shingles, sagging)</li>
        <li>Code violation notices posted on the door (city inspectors have done your work for you)</li>
        <li>Full mailboxes or newspapers piled up (vacant property)</li>
        <li>Peeling paint, rotting wood, or deteriorating siding</li>
        <li>Deferred maintenance combined with a "No Trespassing" sign (bank owned)</li>
        <li>Multiple cars but severe exterior neglect (occupied distress)</li>
      </ul>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Finding the Owner</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Write down the address and look up the property on your county assessor's or tax collector's website. Every county in the US has this available online. Search the address to find the owner's name and mailing address (which is often different from the property address if it is a rental or vacant). You can also use tools like PropStream, BatchLeads, or even a simple Google search of "[county name] property appraiser."
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Reaching Out: Direct Mail and Door Knocking</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Send a handwritten or yellow-letter-style postcard to the owner's mailing address. Keep it simple: "I noticed your property at [address]. I am a local investor interested in buying. If you would consider an offer, please call me at [number]." Response rates are typically 1–3%, so volume matters — mail to 50–100 prospects to generate 2–5 calls.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        For occupied properties, door knocking is even more effective. Approach professionally, explain you are looking to buy in the neighborhood, and ask if they would consider selling. Many sellers say yes to conversations they would never initiate themselves.
      </p>
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Use these tools:</strong> For distressed properties needing work, the{' '}
          <a href="/tools/repairs_estimator" className="text-blue-400 underline hover:text-blue-300">Repairs Estimator</a>{' '}
          helps you quickly scope rehab costs during your initial walkthrough, and the{' '}
          <a href="/tools/flip" className="text-blue-400 underline hover:text-blue-300">Flip Calculator</a>{' '}
          or{' '}
          <a href="/tools/brrr" className="text-blue-400 underline hover:text-blue-300">BRRR Calculator</a>{' '}
          helps you model the exit strategy.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Distressed Properties: Foreclosures, Tax Sales, and REOs</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Distressed properties are owned by lenders, government entities, or sellers in financial trouble — which translates to motivated sellers and potential below-market pricing.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Pre-Foreclosures</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Pre-foreclosures are homes where the owner has missed payments and the lender has filed a Notice of Default (NOD) or Lis Pendens, but the foreclosure auction has not happened yet. These sellers are under pressure but still have time to sell — and often prefer selling to a cash buyer over losing their home at auction.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Find pre-foreclosures on <strong className="text-white">Auction.com</strong>, <strong className="text-white">ATTOM Data</strong>, or by searching your county recorder's public filings for Notices of Default. Approach these owners with empathy — they are in a difficult situation, and a fair, fast offer may be the best outcome for everyone.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Tax Lien and Tax Deed Sales</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        When property owners fail to pay property taxes, counties can place a tax lien on the property. In some states, investors can purchase these liens and earn interest (often 8–36% annually) or eventually foreclose if the owner does not pay. Other states sell the actual property at tax deed auctions.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Contact your county tax collector's office directly to get on their auction notification list. Many counties now post upcoming tax sales online. Rules vary significantly by state, so research your jurisdiction carefully before bidding.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Bank REO Listings</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        REO stands for Real Estate Owned — properties that have already gone through foreclosure and are now owned by the bank. Banks want these off their books, so they are often priced to sell quickly, especially if they have been sitting a while. Find REO listings directly through major bank websites, on <strong className="text-white">Hubzu.com</strong>, or through your local agent who specializes in bank-owned properties.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">HUD Homes</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        HUD homes are FHA-insured properties that have been foreclosed. They are sold through a competitive bidding process at <strong className="text-white">HUDhomestore.com</strong>. Owner-occupants get a priority bidding window before investors can bid — but if a property does not sell in that window, investors can submit offers. HUD homes often need work but can be bought significantly below market.
      </p>
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Use these tools:</strong> Always run the{' '}
          <a href="/tools/arv_comps" className="text-blue-400 underline hover:text-blue-300">ARV Comps Analyzer</a>{' '}
          on distressed properties — the asking price is often based on distressed condition, not market value. Then use the{' '}
          <a href="/tools/repairs_estimator" className="text-blue-400 underline hover:text-blue-300">Repairs Estimator</a>{' '}
          to scope the rehab before making an offer.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Wholesalers: Buying from Investors Who Find Deals for You</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        A wholesaler is an investor who finds deeply discounted properties, puts them under contract, and then sells that contract to another investor for an assignment fee — typically $5,000 to $25,000. They do the sourcing work; you provide the capital and execution. For investors who have money to deploy but not time to find deals, wholesalers can be a valuable pipeline.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">How to Find Wholesalers</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Local REI (Real Estate Investor) meetups:</strong> Search Meetup.com for "[your city] real estate investing." Wholesalers attend these specifically to meet buyers. Bring business cards and tell people you are actively buying.</li>
        <li><strong className="text-white">Facebook groups:</strong> Search "wholesale real estate [your city]" or "[your city] real estate investors." Most active markets have multiple groups with daily deal postings.</li>
        <li><strong className="text-white">BiggerPockets forums:</strong> The Wholesale forum on BiggerPockets has active wholesalers posting deals and looking for buyers. Create a profile indicating you are a cash buyer.</li>
        <li><strong className="text-white">Direct outreach:</strong> If you see "We Buy Houses" signs or mailers in your target market, those are usually wholesalers. Call the number and tell them you are a buyer.</li>
      </ul>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">How to Evaluate Wholesale Deals</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The key to not overpaying on a wholesale deal is to verify the wholesaler's numbers independently. Their ARV estimate may be optimistic and their repair estimate may be low — both in your favor on paper but potentially wrong.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        Run your own comps, walk the property yourself, get a contractor bid, and make sure the math works at your actual numbers — not the wholesaler's. A quick rule of thumb: the Maximum Allowable Offer (MAO) for a flip is typically 70% of ARV minus repairs. For a rental, use your target cash-on-cash return to back into your maximum purchase price.
      </p>
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Use these tools:</strong> Before accepting any wholesale deal, run the numbers through the{' '}
          <a href="/tools/deal_analyzer" className="text-blue-400 underline hover:text-blue-300">Deal Analyzer</a>{' '}
          using your own ARV and repair estimates. Never rely solely on the wholesaler's pro forma.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">6. Off-Market Networking: Building Relationships That Bring Deals to You</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The most reliable long-term deal source is not a website or a mailing list — it is relationships. Investors who are known in their market as reliable, fast-closing buyers get called first when deals appear.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Investment-Focused Real Estate Agents</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Not all agents understand investor math. Find agents who specialize in working with investors — they often know about listings before they hit the MLS (pocket listings), have relationships with distressed sellers, and can move quickly. Tell them specifically what you are looking for: cap rate threshold, price range, condition tolerance. The best investment agents will call you with off-market opportunities before they ever list publicly.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Probate Attorneys</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        When someone dies and leaves real estate, the property often goes through probate. Heirs frequently want to liquidate quickly and may be willing to sell below market for a fast, hassle-free transaction. Probate attorneys know about these properties months before they are listed anywhere.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Introduce yourself to probate attorneys in your market. Offer to be their "go-to" cash buyer for estate properties. Send a brief letter explaining who you are, what you buy, and how fast you can close. Many investors build entire businesses on probate deals alone.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Property Managers</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Property managers know which landlords are burned out, which buildings have deferred maintenance, and which owners are thinking about retiring out of their portfolio. A conversation with a property manager about upcoming listing opportunities often surfaces deals months ahead of the market. Offer to pay a referral fee if they connect you with a seller who closes.
      </p>
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Use these tools:</strong> Off-market multi-unit opportunities are great candidates for the{' '}
          <a href="/tools/house_hack" className="text-blue-400 underline hover:text-blue-300">House Hack Calculator</a>{' '}
          if you plan to occupy one unit, or the{' '}
          <a href="/tools/brrr" className="text-blue-400 underline hover:text-blue-300">BRRR Calculator</a>{' '}
          if you are planning a full rehab and refinance.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">7. Auction Strategies: Buying at the Courthouse Steps and Online</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Auctions offer some of the most dramatic discounts in real estate — and some of the greatest risks. Understanding how they work is essential before you bid.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Courthouse Steps (Live Foreclosure Auctions)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Foreclosure auctions are held at county courthouses (or increasingly online via county auction portals). Properties are sold to the highest bidder above the lender's minimum bid. The winning bidder typically must pay cash within 24 hours and takes the property "as-is" — often without having set foot inside.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        This requires significant due diligence before the auction: drive by the property, pull comparable sales, estimate repair costs from the exterior, and review the title for outstanding liens. Many experienced investors attend 10–20 auctions before bidding, just to learn the process.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Online Auctions</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Platforms like <strong className="text-white">Auction.com</strong> and <strong className="text-white">Hubzu.com</strong> bring foreclosure and bank-owned auctions online. You can browse properties, place proxy bids, and in some cases arrange a showing before bidding. The added transparency compared to courthouse auctions makes them more accessible for newer investors.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Auction Due Diligence Checklist</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Drive the property and assess exterior condition</li>
        <li>Pull comparable sales within 0.5 miles in the last 6 months</li>
        <li>Estimate worst-case repair scenario from what you can see</li>
        <li>Search for outstanding liens, HOA dues, and back taxes at the county recorder</li>
        <li>Confirm the opening bid and calculate your maximum bid with a 20%+ safety margin</li>
        <li>Verify you have cash or cashier's check ready for same-day payment</li>
        <li>Never bid based on the opening bid alone — set your max before the auction starts and do not exceed it</li>
      </ul>
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Use these tools:</strong> Before any auction bid, run the{' '}
          <a href="/tools/arv_comps" className="text-blue-400 underline hover:text-blue-300">ARV Comps Analyzer</a>{' '}
          to establish your value ceiling, then the{' '}
          <a href="/tools/repairs_estimator" className="text-blue-400 underline hover:text-blue-300">Repairs Estimator</a>{' '}
          to establish your cost floor. Your maximum bid is the spread between those two figures minus your desired profit.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Deal Finding Checklist: Your Weekly Action Plan</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Consistent deal flow requires consistent activity. Use this checklist every week to keep your pipeline full:
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
        <h4 className="text-white font-semibold mb-4">Weekly Deal Sourcing Checklist</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Set up saved Zillow/Realtor.com searches with DOM 90+, price reduced, and keyword alerts for "as-is," "estate sale," "motivated seller"</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Check Zillow FSBO filter, Craigslist, and Facebook Marketplace for new FSBO listings in target zip codes</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Drive for dollars in 1–2 target neighborhoods; note addresses of distressed properties and look up owners via county tax records</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Check Auction.com, Hubzu.com, and your county's online tax sale portal for upcoming auctions</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Follow up with 2–3 wholesalers in your market; check their buyer lists and Facebook group posts</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Touch base with your investment-focused agent; ask if anything is coming pre-MLS</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Send 10–20 direct mail pieces to distressed owner addresses identified during the week</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Run every serious lead through the <a href="/tools/deal_analyzer" className="text-blue-400 underline hover:text-blue-300">Deal Analyzer</a> before moving forward</p>
          </div>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed mb-4">
        Most successful investors start by mastering one or two channels deeply before expanding to others. If you are just starting, pick the MLS with keyword alerts and one driving-for-dollars route in a target neighborhood. Consistency over weeks and months is what generates deal flow — not a one-time search.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Every channel above has produced great deals for investors at every experience level. The variable is not which channel — it is the consistency and rigor you bring to each one.
      </p>
    </div>
  )
}

function SpanishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Las mejores oportunidades inmobiliarias rara vez aparecen en la primera pagina de Zillow. Los inversores que consistentemente compran por debajo del valor de mercado, encuentran propiedades con gran potencial y cierran antes de que la competencia aparezca — han dominado el arte de encontrar oportunidades. Esta guia explica cada canal principal de busqueda, como usarlo y que herramientas utilizar cuando encuentres un prospecto.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Trucos de Busqueda en el MLS: Encontrar Propiedades Infravaloradas que Todos Ignoran</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El MLS (Servicio de Listados Multiples) es accesible a traves de Zillow, Realtor.com y Redfin, y la mayoria de los inversores lo descartan como "demasiado competitivo." Es un error. Con los filtros correctos, puedes encontrar vendedores motivados que se esconden a plena vista.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Filtros de Dias en el Mercado (DOM)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Busca propiedades listadas por <strong className="text-white">90+ dias</strong>. Una propiedad con ese tiempo en el mercado senala una de tres cosas: precio excesivo, tiene un problema, o el vendedor esta perdiendo la paciencia. Cualquiera de esas puede significar una oportunidad de negociacion.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Filtros de Reduccion de Precio</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Tanto Zillow como Realtor.com permiten filtrar por propiedades con "Precio Reducido". Un vendedor que ya redujo su precio una vez esta psicologicamente predispuesto a negociar mas. Ordena por el mayor porcentaje de reduccion — esos son los vendedores mas motivados.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Busquedas por Palabras Clave en las Descripciones</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Este es el truco mas subutilizado del MLS. Busca estas frases exactas en las descripciones:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">"Motivated seller" (vendedor motivado)</strong> — el agente te lo dice directamente</li>
        <li><strong className="text-white">"As-is" (como esta)</strong> — el vendedor no reparara nada, senal de urgencia</li>
        <li><strong className="text-white">"Estate sale" (venta de herencia)</strong> — los herederos pueden priorizar velocidad sobre precio</li>
        <li><strong className="text-white">"Investor special" (especial para inversor)</strong> — el agente sabe que necesita trabajo</li>
        <li><strong className="text-white">"Needs TLC" (necesita cuidados)</strong> — deterioro cosmetico o estructural</li>
        <li><strong className="text-white">"Cash only" (solo efectivo)</strong> — limita el numero de compradores potenciales</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-6">
        Guarda estas busquedas y activa alertas por correo en Zillow y Realtor.com para recibir notificaciones inmediatas cuando aparezca una propiedad que coincida.
      </p>
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Usa estas herramientas:</strong> Ejecuta el{' '}
          <a href="/tools/deal_analyzer" className="text-blue-400 underline hover:text-blue-300">Analizador de Negocios</a>{' '}
          para evaluar flujo de caja y retornos, y el{' '}
          <a href="/tools/arv_comps" className="text-blue-400 underline hover:text-blue-300">Analizador ARV</a>{' '}
          para validar el valor de la propiedad despues de reparaciones.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. FSBO (For Sale By Owner): Tratar Directamente con los Propietarios</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Las propiedades FSBO se venden sin agente inmobiliario. Esto importa para los inversores porque no hay comision de agente incorporada en el precio (tipicamente 2.5-3%), lo que crea mas margen para negociar, y el vendedor maneja la transaccion directamente.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Donde Encontrar FSBOs</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Filtro FSBO de Zillow:</strong> En "Tipo de Listado," selecciona "By Owner." Zillow tiene la mayor base de datos de FSBOs en linea.</li>
        <li><strong className="text-white">Craigslist:</strong> Busca en la seccion "bienes raices en venta" de tu ciudad, filtra por propietario.</li>
        <li><strong className="text-white">Facebook Marketplace:</strong> Busca "casa en venta" o "propiedad de inversion" — muchos FSBOs publican aqui porque es gratuito.</li>
        <li><strong className="text-white">Grupos de Facebook:</strong> Busca grupos de "bienes raices en venta [tu ciudad]."</li>
        <li><strong className="text-white">Carteles de "Se Vende por Propietario":</strong> Conduce por los vecindarios. Un cartel hecho a mano con numero de telefono es una linea directa con un vendedor motivado sin intermediarios.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-6">
        Los vendedores FSBO son frecuentemente mas flexibles en terminos como financiamiento del vendedor, contratos de opcion de arrendamiento, o periodos de inspeccion mas largos. No han sido entrenados por un agente para mantener el precio, lo que crea espacio de negociacion.
      </p>
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Usa estas herramientas:</strong> Si el FSBO es un posible arrendamiento, usa la{' '}
          <a href="/tools/rental_yield" className="text-blue-400 underline hover:text-blue-300">Calculadora de Rendimiento de Alquiler</a>.{' '}
          Si el vendedor esta abierto a financiamiento creativo, modela los terminos con la{' '}
          <a href="/tools/owner_finance" className="text-blue-400 underline hover:text-blue-300">Calculadora de Financiamiento del Vendedor</a>.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Conducir Buscando Oportunidades: Encontrar Negocios Antes de que Salgan al Mercado</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        "Driving for dollars" significa conducir fisicamente por los vecindarios buscando propiedades deterioradas que aun no han sido listadas. Estas son las mejores oportunidades porque tienes competencia cero.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Que Buscar</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Cesped y jardines descuidados (propietario ausente o negligencia)</li>
        <li>Ventanas y puertas tapiadas o rotas</li>
        <li>Danos visibles en el techo desde la calle (tejas faltantes, hundimiento)</li>
        <li>Avisos de violacion de codigo pegados en la puerta</li>
        <li>Buzones llenos o periodicos acumulados (propiedad vacia)</li>
        <li>Pintura descascarada, madera podrida o revestimiento deteriorado</li>
      </ul>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Encontrar al Propietario</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Anota la direccion y buscala en el sitio web del tasador o recaudador de impuestos de tu condado. Cada condado en EE.UU. tiene esto disponible en linea. Busca la direccion para encontrar el nombre del propietario y su direccion postal.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Contactar: Correo Directo y Visita Personal</h3>
      <p className="text-gray-300 leading-relaxed mb-6">
        Envia una tarjeta postal manuscrita a la direccion postal del propietario. Mantenlo simple: "Note su propiedad en [direccion]. Soy un inversor local interesado en comprar. Si considera una oferta, llameme al [numero]." Las tasas de respuesta son del 1-3%, por lo que el volumen importa — envia a 50-100 prospectos para generar 2-5 llamadas.
      </p>
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Usa estas herramientas:</strong> Para propiedades que necesitan trabajo, el{' '}
          <a href="/tools/repairs_estimator" className="text-blue-400 underline hover:text-blue-300">Estimador de Reparaciones</a>{' '}
          te ayuda a calcular costos rapidamente, y la{' '}
          <a href="/tools/flip" className="text-blue-400 underline hover:text-blue-300">Calculadora de Flip</a>{' '}
          o{' '}
          <a href="/tools/brrr" className="text-blue-400 underline hover:text-blue-300">Calculadora BRRR</a>{' '}
          modela la estrategia de salida.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Propiedades en Dificultades: Ejecuciones Hipotecarias, Ventas de Impuestos y REOs</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Las propiedades en dificultades son propiedad de prestamistas, entidades gubernamentales o vendedores en problemas financieros — lo que se traduce en vendedores motivados y potencial de precios por debajo del mercado.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Pre-Ejecuciones Hipotecarias</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Las pre-ejecuciones son casas donde el propietario ha dejado de pagar y el prestamista ha presentado una notificacion, pero la subasta de ejecucion hipotecaria aun no ha ocurrido. Encuentralas en <strong className="text-white">Auction.com</strong> o buscando en los registros publicos del condado.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Ventas de Gravamenes Fiscales</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Cuando los propietarios no pagan impuestos sobre la propiedad, los condados pueden colocar un gravamen. Contacta directamente a la oficina del recaudador de impuestos de tu condado para recibir notificaciones de subastas. Las reglas varian significativamente por estado.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Listados REO de Bancos y Casas HUD</h3>
      <p className="text-gray-300 leading-relaxed mb-6">
        REO significa "Real Estate Owned" — propiedades que ya pasaron por ejecucion hipotecaria y son propiedad del banco. Encuentralas en <strong className="text-white">Hubzu.com</strong> o directamente en los portales de bancos. Las casas HUD se venden en <strong className="text-white">HUDhomestore.com</strong>.
      </p>
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Usa estas herramientas:</strong> Siempre ejecuta el{' '}
          <a href="/tools/arv_comps" className="text-blue-400 underline hover:text-blue-300">Analizador ARV</a>{' '}
          en propiedades en dificultades, luego el{' '}
          <a href="/tools/repairs_estimator" className="text-blue-400 underline hover:text-blue-300">Estimador de Reparaciones</a>{' '}
          antes de hacer una oferta.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Mayoristas (Wholesalers): Comprando a Inversores que Encuentran Negocios por Ti</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Un mayorista es un inversor que encuentra propiedades con grandes descuentos, las pone bajo contrato y luego vende ese contrato a otro inversor por una tarifa de asignacion, tipicamente $5,000 a $25,000. Ellos hacen el trabajo de busqueda; tu aportas el capital.
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Reuniones de REI locales:</strong> Busca en Meetup.com reuniones de inversion inmobiliaria en tu ciudad.</li>
        <li><strong className="text-white">Grupos de Facebook:</strong> Busca "wholesale real estate [tu ciudad]" o "inversores inmobiliarios [tu ciudad]."</li>
        <li><strong className="text-white">Foros de BiggerPockets:</strong> El foro de Wholesale tiene mayoristas activos publicando negocios.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-6">
        La clave para no pagar de mas en un negocio al por mayor es verificar los numeros del mayorista de forma independiente. Ejecuta tus propios comparables, visita la propiedad y obtene una cotizacion de contratista propia.
      </p>
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Usa estas herramientas:</strong> Antes de aceptar cualquier negocio al por mayor, ejecuta los numeros en el{' '}
          <a href="/tools/deal_analyzer" className="text-blue-400 underline hover:text-blue-300">Analizador de Negocios</a>{' '}
          usando tus propias estimaciones de ARV y reparaciones.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">6. Redes Fuera del Mercado: Construir Relaciones que Traigan Negocios a Ti</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La fuente de negocios mas confiable a largo plazo no es un sitio web ni una lista de correo — son las relaciones. Los inversores conocidos en su mercado como compradores confiables y de cierre rapido reciben llamadas primero cuando aparecen oportunidades.
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Agentes especializados en inversiones:</strong> Busca agentes que trabajen con inversores — suelen conocer listados antes de que lleguen al MLS.</li>
        <li><strong className="text-white">Abogados de sucesiones:</strong> Cuando alguien muere y deja bienes inmuebles, los herederos frecuentemente quieren liquidar rapidamente.</li>
        <li><strong className="text-white">Administradores de propiedades:</strong> Saben que propietarios estan agotados y cuales edificios tienen mantenimiento diferido.</li>
      </ul>
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Usa estas herramientas:</strong> Las oportunidades multifamiliares fuera del mercado son excelentes candidatas para la{' '}
          <a href="/tools/house_hack" className="text-blue-400 underline hover:text-blue-300">Calculadora de House Hack</a>{' '}
          o la{' '}
          <a href="/tools/brrr" className="text-blue-400 underline hover:text-blue-300">Calculadora BRRR</a>.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">7. Estrategias de Subastas: Comprando en las Escaleras del Tribunal y en Linea</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Las subastas ofrecen algunos de los descuentos mas dramaticos en bienes raices — y algunos de los mayores riesgos. Las subastas de ejecucion hipotecaria se realizan en juzgados de condado o cada vez mas en linea. Las plataformas como <strong className="text-white">Auction.com</strong> y <strong className="text-white">Hubzu.com</strong> llevan las subastas de bancos al entorno digital.
      </p>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Lista de Verificacion de Diligencia Debida en Subastas</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Visita la propiedad y evalua el estado exterior</li>
        <li>Obtene ventas comparables en un radio de 0.5 millas en los ultimos 6 meses</li>
        <li>Estima el peor escenario de reparaciones desde lo que puedes ver</li>
        <li>Busca gravamenes pendientes, cuotas de HOA e impuestos atrasados</li>
        <li>Establece tu oferta maxima antes de que comience la subasta y no la superes</li>
      </ul>
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Usa estas herramientas:</strong> Antes de cualquier oferta en subasta, ejecuta el{' '}
          <a href="/tools/arv_comps" className="text-blue-400 underline hover:text-blue-300">Analizador ARV</a>{' '}
          para establecer el techo de valor, luego el{' '}
          <a href="/tools/repairs_estimator" className="text-blue-400 underline hover:text-blue-300">Estimador de Reparaciones</a>{' '}
          para el piso de costos.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Lista de Verificacion para Encontrar Negocios: Tu Plan de Accion Semanal</h2>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
        <h4 className="text-white font-semibold mb-4">Lista de Verificacion Semanal</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Configura busquedas guardadas en Zillow/Realtor.com con DOM 90+, precio reducido y alertas de palabras clave</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Revisa el filtro FSBO de Zillow, Craigslist y Facebook Marketplace para nuevos listados en tus codigos postales objetivo</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Conduce 1-2 vecindarios objetivo; anota direcciones de propiedades deterioradas y busca propietarios en registros del condado</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Revisa Auction.com, Hubzu.com y el portal de subastas fiscales de tu condado para proximas subastas</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Contacta a 2-3 mayoristas de tu mercado; revisa sus listas de compradores y publicaciones en grupos de Facebook</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Comunicate con tu agente especializado en inversiones; pregunta si hay algo pre-MLS disponible</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Envia 10-20 piezas de correo directo a direcciones de propietarios identificadas durante la semana</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Ejecuta cada prospecto serio en el <a href="/tools/deal_analyzer" className="text-blue-400 underline hover:text-blue-300">Analizador de Negocios</a> antes de avanzar</p>
          </div>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed mb-8">
        La mayoria de los inversores exitosos comienzan dominando uno o dos canales en profundidad antes de expandirse a otros. Si estas comenzando, elige el MLS con alertas de palabras clave y una ruta de conduccion en un vecindario objetivo. La consistencia a lo largo de semanas y meses es lo que genera flujo de negocios.
      </p>
    </div>
  )
}

export function FindingDeals() {
  const { language } = useLanguage()

  return (
    <ArticleLayout
      titleEn="How to Find Hidden Real Estate Deals: The Complete Sourcing Guide"
      titleEs="Como Encontrar Oportunidades Inmobiliarias Ocultas: La Guia Completa de Busqueda"
      readTimeEn="14 min read"
      readTimeEs="14 min de lectura"
      categoryEn="Strategy"
      categoryEs="Estrategia"
    >
      {language === 'en' ? <EnglishContent /> : <SpanishContent />}

      <div className="mt-12 p-6 bg-blue-900/20 border border-blue-700/30 rounded-xl">
        <h3 className="text-white font-bold text-lg mb-2">
          {language === 'en' ? 'Found a Deal? Analyze It Now.' : 'Encontraste un Negocio? Analizado Ahora.'}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {language === 'en'
            ? 'Use our Deal Analyzer to quickly evaluate any property — cash flow, cap rate, cash-on-cash return, and more in under a minute.'
            : 'Usa nuestro Analizador de Negocios para evaluar rapidamente cualquier propiedad — flujo de caja, cap rate, retorno cash-on-cash y mas en menos de un minuto.'}
        </p>
        <Link
          to="/tools/deal_analyzer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {language === 'en' ? 'Open Deal Analyzer' : 'Abrir Analizador de Negocios'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ArticleDisclaimer />
    </ArticleLayout>
  )
}
