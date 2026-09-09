"use client"

import { useEffect, useRef, useState, cloneElement } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { Tooltip } from "react-tooltip";
import { site } from "@/lib/site";

interface PR {
  id: number;
  title: string;
  url: string;
  repository: {
    nameWithOwner: string;
  };
  state: string;
  createdAt: string;
  mergedAt?: string;
  closedAt?: string;
  author?: { login: string };
}

const ACCOUNTS = site.githubAccounts;
const AUTHOR_QUERY = ACCOUNTS.map((a) => `author:${a.username}`).join(" ");

const GithubGraph = () => {
  const { resolvedTheme } = useTheme();
  const [prs, setPrs] = useState<PR[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "merged" | "open" | "closed">("all");
  const [account, setAccount] = useState<string>(ACCOUNTS[0].username);
  // Accounts whose calendar has been opened at least once. Each stays mounted
  // (just hidden) so flipping between tabs never refetches the contribution data.
  const [visited, setVisited] = useState<string[]>([ACCOUNTS[0].username]);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // filter -> already-fetched PRs, so re-selecting a filter is instant.
  const prCache = useRef<Map<string, PR[]>>(new Map());

  const selectAccount = (username: string) => {
    setAccount(username);
    setVisited((prev) => (prev.includes(username) ? prev : [...prev, username]));
  };

  const initialCount = 3;
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const cached = prCache.current.get(filterType);
    if (cached) {
      setPrs(cached);
      setShowAll(false);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchPRs = async () => {
      setLoading(true);
      try {
        const stateFilter =
          filterType === "merged"
            ? " is:merged"
            : filterType === "open"
              ? " is:open"
              : filterType === "closed"
                ? " is:closed is:unmerged"
                : "";

        const searchQuery = `${AUTHOR_QUERY} type:pr${stateFilter}`;

        const query = `query {
          search(query: "${searchQuery}", type: ISSUE, first: 12) {
            edges {
              node {
                ... on PullRequest {
                  id
                  title
                  url
                  repository {
                    nameWithOwner
                  }
                  state
                  createdAt
                  mergedAt
                  closedAt
                  author { login }
                }
              }
            }
          }
        }`;

        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN || ""}`,
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        if (data.data?.search?.edges) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const fetchedPRs = data.data.search.edges.map((edge: any) => edge.node);
          // Sort by date (newest first)
          fetchedPRs.sort((a: PR, b: PR) => {
            const dateA = new Date(b.mergedAt || b.closedAt || b.createdAt).getTime();
            const dateB = new Date(a.mergedAt || a.closedAt || a.createdAt).getTime();
            return dateA - dateB;
          });
          prCache.current.set(filterType, fetchedPRs);
          if (cancelled) return;
          setPrs(fetchedPRs);
          setShowAll(false);
        }
      } catch (error) {
        console.error("Failed to fetch PRs:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPRs();
    return () => {
      cancelled = true;
    };
  }, [filterType]);

  return (
    <div>
      <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 mb-2 -mx-2 md:-mx-14"></div>

      <h1 className="text-neutral-900 dark:text-neutral-50 font-custom font-bold text-3xl tracking-tight py-2">
        <span className="link--elara">Proof Of Work</span>
      </h1>
      <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 mb-4 -mx-2 md:-mx-14"></div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-custom2 text-neutral-700 dark:text-neutral-300 px-2 py-[7px]
             text-sm inline-block
            bg-neutral-100 dark:bg-neutral-900 border-dashed border-neutral-300 dark:border-neutral-700 border">
          Two accounts, one habit — shipping most days.
        </p>

        {/* Account switcher */}
        <div className="relative grid grid-cols-2 p-1 bg-black/5 dark:bg-white/5 rounded-lg border border-neutral-300/30 dark:border-neutral-700/30 w-fit select-none">
          <div
            className={`absolute top-1 bottom-1 left-1 w-[calc((100%-8px)/2)] rounded bg-white dark:bg-neutral-800 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] transform will-change-transform ${
              account === ACCOUNTS[0].username ? "translate-x-0" : "translate-x-[100%]"
            }`}
          />
          {ACCOUNTS.map((a) => (
            <button
              key={a.username}
              onClick={() => selectAccount(a.username)}
              className={`z-10 relative px-3 py-1.5 text-xs font-medium text-center transition-colors duration-200 whitespace-nowrap ${
                account === a.username
                  ? "text-neutral-900 dark:text-neutral-50"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Graph */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <a
            href={`https://github.com/${account}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-custom2 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            @{account}
          </a>
        </div>

        <div className="flex w-full justify-center overflow-x-auto">
          {mounted && (
            <>
              {/* Every visited account stays mounted and is toggled with CSS, so
                  switching tabs never triggers another contributions fetch. */}
              {visited.map((username) => (
                <div key={username} className={username === account ? "block" : "hidden"}>
                  <GitHubCalendar
                    username={username}
                    colorScheme={isDark ? "dark" : "light"}
                    blockSize={isMobile ? 6 : 10}
                    blockMargin={isMobile ? 2 : 3}
                    fontSize={isMobile ? 10 : 12}
                    style={{
                      color: isDark ? "#e5e5e5" : "#171717",
                    }}
                    errorMessage={`Couldn't load contributions for @${username} right now.`}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    renderBlock={(block: any, activity: any) =>
                      cloneElement(block, {
                        "data-tooltip-id": "github-tooltip",
                        "data-tooltip-content": `${activity.count} contributions on ${activity.date}`,
                      })
                    }
                  />
                </div>
              ))}
              <Tooltip
                id="github-tooltip"
                style={{
                  backgroundColor: isDark ? "#171717" : "#ffffff",
                  color: isDark ? "#e5e5e5" : "#171717",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  border: isDark ? "1px solid #404040" : "1px solid #e5e5e5",
                  opacity: 1,
                }}
              />
            </>
          )}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-neutral-900 dark:text-neutral-50 font-custom font-bold text-2xl tracking-tight">
            <span className="link--elara">Pull Requests</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative grid grid-cols-4 p-1 bg-black/5 dark:bg-white/5 rounded-lg border border-neutral-300/30 dark:border-neutral-700/30 w-fit select-none">
              {/* Sliding Pill Background */}
              <div
                className={`absolute top-1 bottom-1 left-1 w-[calc((100%-8px)/4)] rounded bg-white dark:bg-neutral-800 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] transform will-change-transform ${filterType === "all" ? "translate-x-0" : filterType === "merged" ? "translate-x-[100%]" : filterType === "open" ? "translate-x-[200%]" : "translate-x-[300%]"
                  }`}
              />

              {(["all", "merged", "open", "closed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  className={`z-10 relative px-3 py-1.5 text-xs font-medium text-center capitalize transition-colors duration-200 ${filterType === f
                    ? "text-neutral-900 dark:text-neutral-50"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 font-custom2 mb-4">
          {filterType === "all"
            ? "All pull requests across both accounts"
            : filterType === "merged"
              ? "Merged contributions to open source"
              : filterType === "open"
                ? "Active pull requests"
                : "Closed pull requests"}
        </p>
        <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 mb-4 -mx-2 md:-mx-14 mt-6"></div>

        {loading ? (
          <div className="text-neutral-600 dark:text-neutral-400 font-custom2 text-sm mt-4">Loading pull requests...</div>
        ) : prs.length > 0 ? (
          <div>
            <div className="space-y-2 mt-5">
              {prs.slice(0, showAll ? prs.length : initialCount).map((pr) => (
                <div key={pr.id} className="group flex items-start gap-3 p-3 rounded-md transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 border border-transparent hover:border-neutral-300/50 dark:hover:border-neutral-700/50">
                  <div className="shrink-0 mt-0.5">
                    <div className={`w-1 h-1 rounded-full group-hover:scale-150 transition-transform duration-200 ${pr.state === "MERGED"
                      ? "bg-linear-to-r from-purple-400 to-pink-400"
                      : pr.state === "OPEN"
                        ? "bg-linear-to-r from-green-400 to-emerald-400"
                        : "bg-linear-to-r from-red-400 to-rose-400"
                      }`}></div>
                  </div>
                  <a
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-0 hover:no-underline"
                  >
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-50 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors truncate">
                      {pr.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5 font-custom2">
                      {pr.repository.nameWithOwner}
                      {pr.author?.login ? ` · @${pr.author.login}` : ""}
                    </p>
                  </a>
                </div>
              ))}
            </div>
            {prs.length > initialCount && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="group relative overflow-hidden rounded-lg  w-full
                          bg-linear-to-b from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900
                          border border-neutral-200 dark:border-neutral-800
                          text-neutral-800 dark:text-neutral-200 text-sm font-medium px-6 py-2.5
                          transition-all duration-300
                          hover:from-neutral-50 hover:to-neutral-100 dark:hover:from-neutral-800 dark:hover:to-neutral-800
                          shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)]
                          dark:shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
                >
                  {showAll ? "↑ Collapse" : `↓ Expand • ${prs.length - initialCount} more`}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-neutral-600 dark:text-neutral-400 font-custom2 text-sm mt-4">
            No pull requests found. Add a <code className="font-mono text-xs">NEXT_PUBLIC_GITHUB_TOKEN</code> to <code className="font-mono text-xs">.env.local</code> to enable the GitHub API.
          </div>
        )}
      </div>
    </div>

  );
};

export default GithubGraph;
