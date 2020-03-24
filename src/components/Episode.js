import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

const Episode = ({ episodes }) => {
	const { id } = useParams();
	const [e, setE] = useState(null);

	useEffect(() => {
		const getEpisode = () => {
			axios
				.get(`http://api.tvmaze.com/episodes/${id}`)
				.then(res => setE(res.data))
				.catch(err => console.log(err));
		};

		const maybeEpisode = episodes.find(episode => episode.id === parseInt(id));
		maybeEpisode ? setE(maybeEpisode) : getEpisode();
	}, [episodes, id]);

	return (
		<>
			<Link className="all-episodes-link" to="/">
				All Episodes
			</Link>
			{e && (
				<div className="single-episode">
					{e.image && (
						<img className="episode-image" src={e.image.medium} alt={e.name} />
					)}
					<div className="episode-info">
						<p className="episode-number">
							Season {e.season}, Episode {e.number}
						</p>
						<h3>{e.name}</h3>
						{e.summary && parse(e.summary)}
						<div className="flex-spacer" />
						<p className="episode-runtime">{e.runtime} minutes</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Episode;
