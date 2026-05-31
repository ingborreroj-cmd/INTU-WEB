import prisma from '../src/prismaClient';

async function main() {
  const all = await prisma.newsItem.findMany({ orderBy: { published: 'desc' } });
  console.log(`Total news items: ${all.length}`);
  const bySection: Record<string, any[]> = {};
  for (const it of all) {
    const sec = it.section || 'news';
    if (!bySection[sec]) bySection[sec] = [];
    bySection[sec].push(it);
  }

  for (const sec of Object.keys(bySection)) {
    console.log(`\nSection: ${sec} — count: ${bySection[sec].length}`);
    for (const item of bySection[sec]) {
      console.log(`- id=${item.id} title="${item.title}" active=${item.active} imagePath=${item.imagePath || '<none>'} published=${item.published || '<none>'}`);
    }
  }

  // Also show active counts per section
  const sections = Object.keys(bySection);
  for (const sec of sections) {
    const activeCount = bySection[sec].filter(i => i.active).length;
    console.log(`\nSection ${sec}: active ${activeCount}/${bySection[sec].length}`);
  }

  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
