import React from "react";
import PropTypes from "prop-types";
import {VideoResponsive} from './style';

const YoutubeEmbed = ({ embedId }: any) => (
  <VideoResponsive>
    <iframe
      width="600"
      height="330"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </VideoResponsive>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;