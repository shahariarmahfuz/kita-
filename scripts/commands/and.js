module.exports.config = {
	name: "hadis",
	version: "1.0.0",
	permission: 0,
	credits: "nayan",
	prefix: true,
	description: "Download a random image from a set of categories",
	category: "media",
	usages: "হাদিস শরীফ",
	cooldowns: 5,
	dependencies: {
		"axios": "",
		"fs-extra": "",
		"googlethis": "",
		"cloudscraper": ""
	}
};

module.exports.run = async ({ api, event }) => {
	const axios = global.nodemodule['axios'];
	const google = global.nodemodule["googlethis"];
	const cloudscraper = global.nodemodule["cloudscraper"];
	const fs = global.nodemodule["fs-extra"];

	const hadisList = [
			   `হযরত ইবনে উমর (রা.) বলেন, আল্লাহর রাসূল (সাঃ) বলেছেন:
- ইসলাম পাঁচটি স্তম্ভের উপর স্থাপিত (এগুলো হল) এই সাক্ষ্য দেওয়া যে, আল্লাহ ব্যতীত আর কোনো ইলাহ নেই এবং মুহাম্মদ আল্লাহর রাসূল, সালাত আদায় করা, যাকাত আদায় করা, হজ্জ আদায় করা এবং রমাযানের ছিয়াম পালন করা। [বুখারীঃ ৭]`,
		`হযরত আনাস (রাঃ) বলেন, আল্লাহর রাসূল (সাঃ) বলেছেন:
- যার মধ্যে তিনটি গুণ রয়েছে সে ঈমানের স্বাদ অনুভব করবে, (ক) তার কাছে অন্য সবার তুলনায় আল্লাহ ও রাসূল (সাঃ) প্রিয়তর হয়, (খ) কাউকে ভালোবাসলে আল্লাহর জন্যই ভালোবাসে, (গ) আগুনে ফিরে যাওয়াকে যেমন অপ্রিয় জানে, কুফরিতে ফিরে যাওয়াকে তেমন অপ্রিয় মনে করে।
- [বুখারীঃ ১৫]`,
		` আবূ হুরায়রা রাদিয়াল্লাহু ‘আনহু হতে বর্ণিত হয়েছে, রাসূলুল্লাহ্ সাল্লাল্লাহু ‘আলাইহি ওয়াসাল্লাম বলেছেন:✨
- প্রত্যেহ যখন সূর্য উঠে মানুষের (শরীরের) প্রত্যেক গ্রন্থির সাদকাহ্ দেয়া অবশ্য কর্তব্য। দু'জন মানুষের মাঝে ইনসাফ করা হচ্ছে সাদকাহ্, কোন আরোহীকে তার বাহনের উপর আরোহন করতে বা তার উপর বোঝা উঠাতে সাহায্য করা হচ্ছে সাদকাহ্, ভাল কথা হচ্ছে সাদকাহ্, সালাতের জন্য প্রত্যেক পদক্ষেপ হচ্ছে সাদকাহ্ এবং কষ্টদায়ক জিনিস রাস্তা থেকে সরানো হচ্ছে সাদকাহ্।  🤍🥀
- [বুখারী: ২৯৮৯, মুসলিম: ১০০৯]`,
` আবু হুরাইরা (রাঃ) থেকে বর্ণিত। রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম বলেছেন: ✨
-  বান্দা যখন সিজদায় থাকে তখন তার রবের সবচাইতে নিকটবর্তী হয়। কাজেই তোমরা (সিজদায় গিয়ে) বেশি করে দু’আ কর 🤍🥀
- [মুসলিম, রিয়াদুস সালেহীন- ১৪৯৮]`,
` আবু হুরায়রা (রা) হতে বর্ণিত। তিনি বলেন, রসূল (স.) বলেছেন:✨
-   যে তার হালাল রোযগার থেকে একটি খেজুর পরিমাণ দান করবে (আল্লাহ তা কবুল করবেন) এবং আল্লাহ হালাল বস্তু ছাড়া কিছুই গ্রহন করেন না। আর আল্লাহ তা তার ডান হাতে গ্রহণ করবেন। অতঃপর তার দানকারীর জন্য তা প্রতিপালন করতে থাকেন যেরূপ তোমাদের কেউ তার অশ্ব-শাবককে লালন-পালন করতে থাকে। অবশেষে একদিন তা পাহাড় সমতুল্য হয়ে যায়। 🤍🥀
- [সহীহুল বুখারী হা/৭৪৩০, ১৪১০: (তাওহীদ প্রকাশনী); সহীহুল মুসলিমঃ ২২১১]`,
` আবূ হুরাইরাহ আব্দুর রহমান ইবনুূ সাখর রাদিয়াল্লাহু ‘আনহু কর্তৃক বর্ণিত, রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন:✨
-   নিশ্চয় আল্লাহ তা‘আলা তোমাদের দেহ এবং তোমাদের আকৃতি দেখেন না, বরং তিনি তোমাদের অন্তর ও আমল দেখেন 🤍🥀
- [সহীহুল বুখারী ৫১৪৪, ৬০৬৬, মুসলিম ২৫৬৪]`,
` আবু যার (রাঃ) থেকে বর্ণিত, তিনি বলেন যে, নবী (সঃ) আমাকে বলেছেন:✨
-  তুমি পূণ্যের কোন কাজ কে তুচ্ছ মনে করো না। যদিও তুমি তোমার (মুসলিম) ভাইয়ের সঙ্গে হাসিমুখে সাক্ষাত করতে পার।  🤍🥀
- [রিয়াদুস সালেহীনঃ ১২৩, মুসলিম- ২৬২৬, তিরমিযী- ১৮৩৩, ইবনে মাজাহ- ৩৩৬২, দারেমী- ২০৭৯]`,
` আনাস (রাঃ) থেকে বর্ণিত, রাসূলুল্লাহ (সঃ) বলেন:✨
-  তিনটি জিনিস মৃত ব্যক্তির সঙ্গে যায়ঃ আত্মীয়-স্বজন, তার মাল ও তার আ'মল। অতঃপর দুটি জিনিস ফিরে আসে এবং একটি জিনিস রয়ে যায়। তার আত্মীয়-স্বজন ও তার মাল ফিরে আসে এবং তার আ'মল (তার সঙ্গে) রয়ে যায়। 🤍🥀
- [রিয়াদুস সালেহীন- ১০৬, বুখারী- ৬৫১৪, মুসলিম- ২৯৬০, তিরমিযী- ২৩৭৯, নাসায়ী- ১৯৩৭, আহমাদ- ১১৬৭০]`,
` আবূ হুরাইরা হতে বর্ণিত, তিনি বলেন, রাসূলুল্লাহ (সা:) বলেন:✨
-    মহান আল্লাহ বলেছেন, ‘আমি আমার পুণ্যবান বান্দাদের জন্য এমন জিনিস প্রস্তুত রেখেছি, যা কোন চক্ষু দর্শন করেনি, কোন কর্ন শ্রবন করেনি এবং যার সম্পর্কে কোন মানুষের মনে ধারণাও জন্মেনি। তোমরা চাইলে এ আয়াতটি পাঠ করতে পার; যার অর্থ- কেউই জানে না তার জন্য তার কৃতকর্মের বিনিময় স্বরূপ নয়ন-প্রীতিকর কী পুরস্কার লুকিয়ে রাখা হয়েছে। (সূরা সাজদাহ- ১৭) 🤍🥀
- [সহীহুল বুখারী- ৩২৪৪, ৪৭৭৯,৪৭৮০]`,
		` আনাস (রাঃ) থেকে বর্ণিত, নবী (সঃ) তাঁর মহান প্রভু হতে বর্ণনা করেন যে, আল্লাহ তাআলা বলেন:✨
-  যখন বান্দা আমার দিকে এক বিঘত অগ্রসর হয়, তখন আমি তার দিকে এক হাত অগ্রসর হই। যখন সে আমার দিকে এক হাত অগ্রসর হয় তখন আমি তার দিকে দুই হাত অগ্রসর হই। আর যখন সে আমার দিকে হেঁটে আসে তখন আমি তার দিকে দৌড়ে যাই। 🤍🥀
- [রিয়াদুস সালেহীনঃ ৯৭, বুখারী-৭৫৩৬,৭৪০৫, ৭৫২৭, মুসলিম-২৬৭৫, তিরমিযী-২৩৮৮, ৩৬০৩, ইবনে মাজাহ-৩৮২২, আহমাদ-৭৩৭৪, ২৭৪০৯, ৮৪৩৬]`,
` আবু হুরায়রা (রাঃ) হতে বর্ণিত, আল্লাহর রাসূল (সঃ) বলেছেন:✨
-  আল্লাহ যার মঙ্গল চান, তাকে দুঃখ কষ্টে ফেলেন। 🤍🥀
- [রিয়াদুস সালেহীনঃ ৪০; বুখারী-৫৬৪৫, আহমাদ-৭১৯৪, মুওয়াত্তা মালেক-১৭৫২]`,
` আবু সাঈদ (রাঃ) ও আবু হুরায়রা (রাঃ) থেকে বর্ণিত, রাসূল (সঃ) বলেছেন:✨
-  মুসলিমকে যে কোন ক্লান্তি, অসুখ, চিন্তা, শোক এমনকি (তার পায়ে) কাঁটাও লাগে, আল্লাহ তাআলা এর মাধ্যমে তার গুনাহসমূহ ক্ষমা করে দেন। 🤍🥀
- [রিয়াদুস সালেহীনঃ ৩৮; সহীহ বুখারী-৫৬৪২, সহীহ মুসলিম-২৫৭৩, তিরমিযী-৯৬৬, আহমাদ-৭৯৬৯, ৮২১৯, ৮৯৬৬, ১০৬২৪]`,
` ইবনে আব্বাস (রাঃ) থেকে বর্ণিত, আল্লাহর রাসূল (সঃ) বলেছেন:✨
-  যদি আদম সন্তানের সোনার একটি উপত্যাকা হয়, তবুও সে চাইবে যে, তার কাছে দুটি উপত্যকা হোক। মাটিই একমাত্র তার মুখ পূর্ন করতে পারবে। আর যে তাওবা করে, আল্লাহ তাওবা গ্রহণ করেন।  🤍🥀
- [রিয়াদুস সালেহীনঃ ২৪; সহীহ বুখারী-৬৪৩৬, ৬৪৩৭, মুসলিম-১০৪৯, তিরমিযী-৩৭৯৩, ৩৭৯৮, আহমাদ-৩৪৯১, ২০৬০৭, ২০৬৯৭]`,
` আবু হামযা আনাস (রাঃ) থেকে বর্ণিত, তিনি বলেন, আল্লাহর রাসূল (সঃ) বলেছেন: ✨
-  আল্লাহ তাআলা স্বীয় বান্দার তাওবা করার জন্য ঐ ব্যক্তি অপেক্ষা বেশী আনন্দিত হন, যে তার উট হারিয়ে ফেলার পর পুনরায় ফিরে পায়। 🤍🥀
- [রিয়াদুস সালেহীনঃ ১৬; সহীহ বুখারী-৬৩০৯, মুসলিম-২৭৪৭, আহমাদ-১২৮১৫]`,
` হারিসা ইবনে ওহব(রা:) থেকে বর্ণিত। তিনি বলেন, আমি নবী(সা:)কে বলতে শুনেছি:✨
-  আমি কি তোমাদের দোজখীদের বিষয়ে জানাব না? তারা হলো : প্রত্যেক অহংকারী, সীমালংঘনকারী, অবিনয়ী ও উদ্ধত লোক। 🤍🥀
- [বুখারী, মুসলিম, রিয়াদুস সালেহীন: ৬১৪]`,
		` আয়িশা (রা) থেকে বর্ণিত, নাবী কারীম (সা) বলেন:✨
-  অতি ঝগড়াটে ব্যক্তি আল্লাহর নিকট সর্বাপেক্ষা নিকৃষ্ট ব্যক্তি । 🤍🥀
- [বুখারী, মুসলিম, আস-সহীহা: ৩৯৭০]`,
` আবু হুরায়রা (রা) থেকে মারফূ সূত্রে বর্ণিত :
✨
-  নিশ্চয় জান্নাতে (কোন) ব্যক্তির মর্যাদা (অনেক) বৃদ্ধি করা হবে। সে বলবে, আমার জন্য কিভাবে এটা হলো? অতঃপর তাকে বলা হবে, তোমার জন্য তোমার সন্তানের (ক্ষমা প্রার্থনা) ইস্তেগফার করার কারণে। 🤍🥀
- [ইবনু মাজাহ, আহমাদ, আস-সহীহা: ১৫৯৮]`,
` আনাস (রা) থেকে মারফূ সূত্রে বর্ণিত:✨
- যখন কোন বান্দা তার ভাইয়ের সাথে আল্লাহর সন্তুষ্টি অর্জনের উদ্দেশ্যে সাক্ষাৎ করতে আসে তখন আসমানে এক ঘোষক ঘোষণা করেন যে, তোমার মঙ্গল হোক এবং জান্নাত তোমার জন্য উত্তম হোক। আর আল্লাহ তা'আলা আরশের ফেরেশতাদের বলেন, আমার বান্দা আমার সাথে সাক্ষাৎ করেছে । আমার জন্য তার মেহমানদারী করা আবশ্যক। আমি জান্নাত ব্যতীত অন্য কিছু দ্বারা তার মেহমানদারী করতে নারাজ।  🤍🥀
- [আস-সহীহা: ২৬৩২]`,
` ইবনু উমার (রা) থেকে মারফূ সূত্রে বর্ণিত:✨
-  মুমিনগণ সহজ সরল ও নম্র-ভদ্র স্বভাবের হয়ে থাকে। গৃহপালিত উট যেমন (শান্ত-শিষ্ট হয়ে থাকে), যদি তাকে থামানো হয় তবে সে থেমে যায়। আর যদি চালানো হয় তবে চলে। যদি তুমি তাকে পাথরের উপর বসাও তবুও সে বসে।  🤍🥀
- [আস-সহীহা: ৯৩৬]`,
` মিকদাম ইবনু মা'দী কারিব (রা) থেকে মারফূ সূত্রে বর্ণিত:✨
- যখন তিনজন ব্যক্তি একত্রে থাকে, তখন যেন তৃতীয় জনকে রেখে দু'জন কানে কানে কথা না বলে।  🤍🥀
- [মুসনাদে আহমাদ, আস-সহীহা: ১৪০২]`,
` জাবির ইবনু আব্দুল্লাহ (রা) থেকে মারফূ সূত্রে বর্ণিত:✨
-  যখন রাতের অন্ধকার ঘনিয়ে আসবে তখন বাচ্চাদের (ঘর থেকে বের হতে) বাধা দিবে। কারণ, শাইত্বান ঐ সময় ছড়িয়ে পড়ে। যখন ইশার সময় অতিক্রান্ত হয়ে যায় তখন তাদের ছেড়ে দিবে। 🤍🥀
- [বুখারী, আস-সহীহা: ৪০]`,
` আবু হুরায়রা (রা) থেকে মারফূ সূত্রে বর্ণিত:✨
-  মানুষের মধ্যে প্রিয় ঐ ব্যক্তি, যে চাওয়ার ক্ষেত্রে অক্ষমতা দেখায়। আর মানুষের মধ্যে সবচেয়ে কৃপণ ঐ ব্যক্তি যে সালামের ক্ষেত্রে কৃপণতা দেখায়। 🤍🥀
- [ইবনু হিব্বান, আস-সহীহা: ৬০১]`,
		// এখানে আরও হাদিস যোগ করুন
	];

	const queries = ["Muslim worshiping and praying", "Kaaba image", "beautiful flower","madina","beautiful masjid","Quran","best masjid in the world","beautiful masjid al aqsa"]; // সার্চ কোয়েরির অ্যারে

	try {
		const randomQuery = queries[Math.floor(Math.random() * queries.length)]; // রেনডম কোয়েরি নির্বাচন
		let result = await google.image(randomQuery, { safe: false });
		if (result.length === 0) return; // কোনো মেসেজ প্রদর্শন না করে ফাংশন থেকে বের হয়ে যাবে

		const randomIndex = Math.floor(Math.random() * result.length);
		const imageUrl = result[randomIndex].url;
		const randomHadis = hadisList[Math.floor(Math.random() * hadisList.length)]; // রেনডম হাদিস নির্বাচন

		let path = __dirname + `/cache/image.jpg`;
		let buffer = await cloudscraper.get({ uri: imageUrl, encoding: null });
		fs.writeFileSync(path, buffer);

		api.sendMessage({ body: randomHadis, attachment: fs.createReadStream(path) }, event.threadID, () => {
			fs.unlinkSync(path); // ডাউনলোড করা ছবি মুছে ফেলা হয়েছে
		});
	} catch (error) {
		// কোনো ধরনের ত্রুটি বা সমস্যা মেসেজ প্রদর্শন না করে ফাংশন থেকে বের হয়ে যাবে
		return;
	}
};
