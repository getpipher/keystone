# `keystone redesign` (v2 — not yet implemented)

**Status:** Planned for Keystone v2. Not shipped in v1.

`keystone redesign <target>` will take an existing page's content and intent
and rebuild the visual/interaction layer inside the existing implementation
boundaries (preserve routes, component ownership, copy intent, brand, IA;
replace only the visual/interaction layer). It reuses the Build flow's engine
at Step 7.

Until v2, use the default `keystone build` verb (build fresh) or `keystone
audit` (read-only punch list, then fix manually).
